'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { RoundResult, Choice } from '@/lib/types';
import { getSoundManager } from '@/lib/sounds';

interface RoundResultViewProps {
  roundResult: RoundResult;
  playerId: string;
  playerName: string;
  opponentName: string;
}

export default function RoundResultView({ roundResult, playerId, playerName, opponentName }: RoundResultViewProps) {
  const getEmoji = (choice: Choice) => {
    switch (choice) {
      case 'rock':
        return '✊';
      case 'paper':
        return '✋';
      case 'scissors':
        return '✌️';
    }
  };

  const isPlayer1 = true;
  const playerChoice = isPlayer1 ? roundResult.player1Choice : roundResult.player2Choice;
  const opponentChoice = isPlayer1 ? roundResult.player2Choice : roundResult.player1Choice;

  let resultText = '';
  let resultColor = '';
  let isWin = false;

  if (roundResult.winner === 'tie') {
    resultText = "It's a Tie!";
    resultColor = 'text-gray-600';
  } else if (
    (roundResult.winner === 'player1' && isPlayer1) ||
    (roundResult.winner === 'player2' && !isPlayer1)
  ) {
    resultText = 'You Won This Round!';
    resultColor = 'text-green-600';
    isWin = true;
  } else {
    resultText = 'You Lost This Round!';
    resultColor = 'text-red-600';
  }

  useEffect(() => {
    const sound = getSoundManager();

    if (isWin) {
      // Small confetti burst for round win
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#4ade80', '#86efac'],
      });
      sound?.playRoundWin();
    } else if (roundResult.winner === 'tie') {
      sound?.playTie();
    } else {
      sound?.playRoundLose();
    }
  }, [isWin, roundResult.winner]);

  return (
    <div className="glass-strong rounded-3xl p-12 max-w-3xl w-full animate-zoom-in-3d card-3d shadow-2xl rgb-border holographic-card"
         style={{
           boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(168, 85, 247, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)',
         }}>
      <div className="flex justify-center mb-10">
        <div className="bg-black/70 px-8 py-4 rounded-2xl backdrop-blur-sm">
          <h2 className="text-5xl font-black text-white mb-0 animate-slide-up"
              style={{
                textShadow: `
                  0 0 20px #ff00ff,
                  0 0 40px #ff00ff,
                  0 0 60px #ff00ff,
                  3px 3px 0 #000,
                  -3px -3px 0 #000,
                  3px -3px 0 #000,
                  -3px 3px 0 #000
                `,
              }}>
            ROUND {roundResult.round} RESULT
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-10 mb-10">
        <div className="text-center animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="bg-black/80 px-6 py-2 rounded-xl backdrop-blur-sm mb-4 inline-block">
            <p className="text-2xl font-black text-white mb-0"
               style={{
                 textShadow: `
                   0 0 10px #00ffff,
                   0 0 20px #00ffff,
                   2px 2px 0 #000,
                   -2px -2px 0 #000
                 `,
               }}>{playerName.toUpperCase()}</p>
          </div>
          <div className={`glass rounded-3xl p-10 border-2 ${isWin ? 'border-green-400 animate-neon-pulse' : !isWin && roundResult.winner !== 'tie' ? 'animate-shake rgb-border' : 'rgb-border'} holographic-card`}
               style={{
                 boxShadow: isWin
                   ? '0 10px 40px rgba(34, 197, 94, 0.4), 0 0 30px rgba(34, 197, 94, 0.6)'
                   : '0 10px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(168, 85, 247, 0.4)',
               }}>
            <div className="text-8xl mb-4 animate-bounce drop-shadow-[0_0_30px_rgba(255,255,255,1)] animate-glitch"
                 style={{ filter: 'brightness(1.5)' }}>{getEmoji(playerChoice)}</div>
            <div className="bg-black/80 px-4 py-2 rounded-xl">
              <p className="text-2xl font-black capitalize text-white mb-0"
                 style={{
                   textShadow: `
                     0 0 10px #ff00ff,
                     0 0 20px #ff00ff,
                     2px 2px 0 #000,
                     -2px -2px 0 #000
                   `,
                 }}>{playerChoice}</p>
            </div>
          </div>
          <div className="bg-black/80 px-6 py-2 rounded-xl backdrop-blur-sm inline-block mt-6">
            <p className="text-3xl font-black text-white mb-0"
               style={{
                 textShadow: `
                   0 0 15px #ffff00,
                   0 0 30px #ffff00,
                   2px 2px 0 #000,
                   -2px -2px 0 #000
                 `,
               }}>
              SCORE: {roundResult.player1Score}
            </p>
          </div>
        </div>

        <div className="text-center animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="bg-black/80 px-6 py-2 rounded-xl backdrop-blur-sm mb-4 inline-block">
            <p className="text-2xl font-black text-white mb-0"
               style={{
                 textShadow: `
                   0 0 10px #ff0000,
                   0 0 20px #ff0000,
                   2px 2px 0 #000,
                   -2px -2px 0 #000
                 `,
               }}>{opponentName.toUpperCase()}</p>
          </div>
          <div className={`glass rounded-3xl p-10 border-2 ${!isWin && roundResult.winner !== 'tie' ? 'border-red-400 animate-neon-pulse' : 'rgb-border'} holographic-card`}
               style={{
                 boxShadow: !isWin && roundResult.winner !== 'tie'
                   ? '0 10px 40px rgba(239, 68, 68, 0.4), 0 0 30px rgba(239, 68, 68, 0.6)'
                   : '0 10px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(168, 85, 247, 0.4)',
               }}>
            <div className="text-8xl mb-4 animate-bounce drop-shadow-[0_0_30px_rgba(255,255,255,1)] animate-glitch"
                 style={{ filter: 'brightness(1.5)' }}>{getEmoji(opponentChoice)}</div>
            <div className="bg-black/80 px-4 py-2 rounded-xl">
              <p className="text-2xl font-black capitalize text-white mb-0"
                 style={{
                   textShadow: `
                     0 0 10px #ff00ff,
                     0 0 20px #ff00ff,
                     2px 2px 0 #000,
                     -2px -2px 0 #000
                   `,
                 }}>{opponentChoice}</p>
            </div>
          </div>
          <div className="bg-black/80 px-6 py-2 rounded-xl backdrop-blur-sm inline-block mt-6">
            <p className="text-3xl font-black text-white mb-0"
               style={{
                 textShadow: `
                   0 0 15px #ffff00,
                   0 0 30px #ffff00,
                   2px 2px 0 #000,
                   -2px -2px 0 #000
                 `,
               }}>
              SCORE: {roundResult.player2Score}
            </p>
          </div>
        </div>
      </div>

      <div className="text-center animate-slide-up" style={{ animationDelay: '300ms' }}>
        <div className={`bg-black/80 px-10 py-5 rounded-2xl backdrop-blur-sm inline-block mb-6 ${isWin ? 'animate-bounce' : !isWin && roundResult.winner !== 'tie' ? 'animate-shake' : ''}`}>
          <h3 className="text-6xl font-black text-white mb-0"
              style={{
                textShadow: isWin
                  ? `
                    0 0 20px #00ff00,
                    0 0 40px #00ff00,
                    0 0 60px #00ff00,
                    3px 3px 0 #000,
                    -3px -3px 0 #000,
                    3px -3px 0 #000,
                    -3px 3px 0 #000
                  `
                  : !isWin && roundResult.winner !== 'tie'
                  ? `
                    0 0 20px #ff0000,
                    0 0 40px #ff0000,
                    0 0 60px #ff0000,
                    3px 3px 0 #000,
                    -3px -3px 0 #000,
                    3px -3px 0 #000,
                    -3px 3px 0 #000
                  `
                  : `
                    0 0 20px #ffff00,
                    0 0 40px #ffff00,
                    0 0 60px #ffff00,
                    3px 3px 0 #000,
                    -3px -3px 0 #000,
                    3px -3px 0 #000,
                    -3px 3px 0 #000
                  `,
              }}>
            {resultText}
          </h3>
        </div>
        <div className="flex justify-center items-center space-x-3">
          <div className="animate-pulse text-5xl drop-shadow-[0_0_30px_rgba(168,85,247,1)]"
               style={{ filter: 'brightness(1.5)' }}>⏱️</div>
          <div className="bg-black/80 px-6 py-2 rounded-xl backdrop-blur-sm">
            <p className="text-xl font-bold text-white mb-0"
               style={{
                 textShadow: `
                   0 0 10px #00ffff,
                   0 0 20px #00ffff,
                   2px 2px 0 #000,
                   -2px -2px 0 #000
                 `,
               }}>Next round starting...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
