"use client";

import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { getSocket, connectSocket } from '@/lib/socket';
import {
  GameState,
  GameStartData,
  RoundResult,
  GameOverData,
  LobbyUpdate,
  Choice,
} from '@/lib/types';
import Landing from '@/components/Landing';
import NameInput from '@/components/NameInput';
import Lobby from '@/components/Lobby';
import Game from '@/components/Game';
import RoundResultView from '@/components/RoundResultView';
import GameOver from '@/components/GameOver';
import MusicControl from '@/components/MusicControl';
import { getSoundManager } from '@/lib/sounds';

export default function Home() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [gameState, setGameState] = useState<GameState>('landing');
  const [playerName, setPlayerName] = useState<string>('');
  const [playersWaiting, setPlayersWaiting] = useState(0);
  const [gameData, setGameData] = useState<GameStartData | null>(null);
  const [roundResult, setRoundResult] = useState<RoundResult | null>(null);
  const [gameOverData, setGameOverData] = useState<GameOverData | null>(null);
  const [currentRound, setCurrentRound] = useState(1);
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [waitingForOpponent, setWaitingForOpponent] = useState(false);

  useEffect(() => {
    const socketInstance = connectSocket();
    setSocket(socketInstance);

    socketInstance.on('lobby_update', (data: LobbyUpdate) => {
      setPlayersWaiting(data.playersWaiting);
    });

    socketInstance.on('game_start', (data: GameStartData) => {
      const sound = getSoundManager();
      sound?.playGameStart();

      setGameData(data);
      setGameState('playing');
      setCurrentRound(1);
      setPlayerChoice(null);
      setWaitingForOpponent(false);
    });

    socketInstance.on('round_result', (data: RoundResult) => {
      setRoundResult(data);
      setGameState('round_result');
      setWaitingForOpponent(false);
    });

    socketInstance.on('next_round', ({ round }: { round: number }) => {
      setCurrentRound(round);
      setGameState('playing');
      setPlayerChoice(null);
      setWaitingForOpponent(false);
    });

    socketInstance.on('game_over', (data: GameOverData) => {
      setGameOverData(data);
      setGameState('game_over');
    });

    socketInstance.on('opponent_disconnected', () => {
      alert('Opponent disconnected!');
      setGameState('landing');
      setGameData(null);
    });

    return () => {
      socketInstance.off('lobby_update');
      socketInstance.off('game_start');
      socketInstance.off('round_result');
      socketInstance.off('next_round');
      socketInstance.off('game_over');
      socketInstance.off('opponent_disconnected');
    };
  }, []);

  const handlePlay = () => {
    setGameState('name_input');
  };

  const handleNameSubmit = (name: string) => {
    setPlayerName(name);
    setGameState('lobby');
    socket?.emit('join_lobby', name);
  };

  const handleChoice = (choice: Choice) => {
    if (!gameData || !socket) return;
    setPlayerChoice(choice);
    setWaitingForOpponent(true);
    socket.emit('make_choice', {
      gameId: gameData.gameId,
      choice,
    });
  };

  const handleReturnToLobby = () => {
    setGameState('landing');
    setGameData(null);
    setGameOverData(null);
    setRoundResult(null);
    setPlayerChoice(null);
    setWaitingForOpponent(false);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        {gameState === 'landing' && <Landing onPlay={handlePlay} />}

        {gameState === 'name_input' && <NameInput onSubmit={handleNameSubmit} />}

        {gameState === 'lobby' && <Lobby playersWaiting={playersWaiting} />}

        {gameState === 'playing' && gameData && (
          <Game
            round={currentRound}
            onChoice={handleChoice}
            playerChoice={playerChoice}
            waitingForOpponent={waitingForOpponent}
            playerName={gameData.playerName}
            opponentName={gameData.opponentName}
          />
        )}

        {gameState === 'round_result' && roundResult && gameData && (
          <RoundResultView
            roundResult={roundResult}
            playerId={gameData.playerId}
            playerName={gameData.playerName}
            opponentName={gameData.opponentName}
          />
        )}

        {gameState === 'game_over' && gameOverData && gameData && (
          <GameOver
            gameOverData={gameOverData}
            playerId={gameData.playerId}
            playerName={gameData.playerName}
            opponentName={gameData.opponentName}
            onReturnToLobby={handleReturnToLobby}
          />
        )}
      </div>

      <MusicControl />
    </>
  );
}
