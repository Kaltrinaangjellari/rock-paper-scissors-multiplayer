export type Choice = 'rock' | 'paper' | 'scissors';

export type GameState = 'landing' | 'name_input' | 'lobby' | 'playing' | 'round_result' | 'game_over';

export interface GameStartData {
  gameId: string;
  playerId: string;
  opponentId: string;
  playerName: string;
  opponentName: string;
}

export interface RoundResult {
  round: number;
  player1Choice: Choice;
  player2Choice: Choice;
  winner: 'player1' | 'player2' | 'tie';
  player1Score: number;
  player2Score: number;
}

export interface GameOverData {
  winner: string | 'tie';
  player1Score: number;
  player2Score: number;
}

export interface LobbyUpdate {
  playersWaiting: number;
}

export interface EventCard {
  emoji: string;
  name: string;
  description: string;
}
