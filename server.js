const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const hostname = dev ? 'localhost' : '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Game state
const waitingPlayers = [];
const activeGames = new Map();
const playerSockets = new Map();

// Game logic
const choices = ['rock', 'paper', 'scissors'];

function determineWinner(choice1, choice2) {
  if (choice1 === choice2) return 'tie';
  if (
    (choice1 === 'rock' && choice2 === 'scissors') ||
    (choice1 === 'paper' && choice2 === 'rock') ||
    (choice1 === 'scissors' && choice2 === 'paper')
  ) {
    return 'player1';
  }
  return 'player2';
}

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('join_lobby', (playerName) => {
      console.log('Player joined lobby:', socket.id, 'Name:', playerName);

      // Add player to waiting list with their name
      waitingPlayers.push({ id: socket.id, name: playerName });
      playerSockets.set(socket.id, socket);

      // Notify lobby size
      io.emit('lobby_update', { playersWaiting: waitingPlayers.length });

      // Try to match players
      if (waitingPlayers.length >= 2) {
        const player1 = waitingPlayers.shift();
        const player2 = waitingPlayers.shift();

        const gameId = `game_${Date.now()}`;

        activeGames.set(gameId, {
          id: gameId,
          player1: {
            id: player1.id,
            name: player1.name,
            score: 0,
            choice: null,
            ready: false
          },
          player2: {
            id: player2.id,
            name: player2.name,
            score: 0,
            choice: null,
            ready: false
          },
          round: 1,
          maxRounds: 3
        });

        // Join both players to game room
        const player1Socket = playerSockets.get(player1.id);
        const player2Socket = playerSockets.get(player2.id);

        if (player1Socket && player2Socket) {
          player1Socket.join(gameId);
          player2Socket.join(gameId);

          player1Socket.emit('game_start', {
            gameId,
            playerId: player1.id,
            opponentId: player2.id,
            playerName: player1.name,
            opponentName: player2.name
          });
          player2Socket.emit('game_start', {
            gameId,
            playerId: player2.id,
            opponentId: player1.id,
            playerName: player2.name,
            opponentName: player1.name
          });
        }

        // Update lobby for remaining players
        io.emit('lobby_update', { playersWaiting: waitingPlayers.length });
      }
    });

    socket.on('make_choice', ({ gameId, choice }) => {
      const game = activeGames.get(gameId);
      if (!game) return;

      // Record player choice
      if (game.player1.id === socket.id) {
        game.player1.choice = choice;
        game.player1.ready = true;
      } else if (game.player2.id === socket.id) {
        game.player2.choice = choice;
        game.player2.ready = true;
      }

      // Check if both players made their choice
      if (game.player1.ready && game.player2.ready) {
        const winner = determineWinner(game.player1.choice, game.player2.choice);

        // Update scores
        if (winner === 'player1') {
          game.player1.score++;
        } else if (winner === 'player2') {
          game.player2.score++;
        }

        // Send round results
        io.to(gameId).emit('round_result', {
          round: game.round,
          player1Choice: game.player1.choice,
          player2Choice: game.player2.choice,
          winner: winner,
          player1Score: game.player1.score,
          player2Score: game.player2.score,
        });

        // Check if game is over
        if (game.round >= game.maxRounds) {
          let finalWinner;
          if (game.player1.score > game.player2.score) {
            finalWinner = game.player1.id;
          } else if (game.player2.score > game.player1.score) {
            finalWinner = game.player2.id;
          } else {
            finalWinner = 'tie';
          }

          setTimeout(() => {
            io.to(gameId).emit('game_over', {
              winner: finalWinner,
              player1Score: game.player1.score,
              player2Score: game.player2.score,
            });

            // Clean up game
            activeGames.delete(gameId);
          }, 3000);
        } else {
          // Next round
          game.round++;
          game.player1.choice = null;
          game.player1.ready = false;
          game.player2.choice = null;
          game.player2.ready = false;

          setTimeout(() => {
            io.to(gameId).emit('next_round', { round: game.round });
          }, 3000);
        }
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);

      // Remove from waiting list
      const waitingIndex = waitingPlayers.findIndex(p => p.id === socket.id);
      if (waitingIndex > -1) {
        waitingPlayers.splice(waitingIndex, 1);
        io.emit('lobby_update', { playersWaiting: waitingPlayers.length });
      }

      // Handle active game disconnection
      for (const [gameId, game] of activeGames.entries()) {
        if (game.player1.id === socket.id || game.player2.id === socket.id) {
          io.to(gameId).emit('opponent_disconnected');
          activeGames.delete(gameId);
        }
      }

      playerSockets.delete(socket.id);
    });
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
