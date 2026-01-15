'use client';

import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { GameOverData } from '@/lib/types';
import { getSoundManager } from '@/lib/sounds';

interface GameOverProps {
  gameOverData: GameOverData;
  playerId: string;
  playerName: string;
  opponentName: string;
  onReturnToLobby: () => void;
}

export default function GameOver({ gameOverData, playerId, playerName, opponentName, onReturnToLobby }: GameOverProps) {
  const isWinner = gameOverData.winner === playerId;
  const isTie = gameOverData.winner === 'tie';
  const [tears, setTears] = useState<Array<{ id: number; left: string; delay: string; duration: string }>>([]);

  let resultText = '';
  let resultColor = '';
  let emoji = '';

  if (isTie) {
    resultText = "It's a Tie!";
    resultColor = 'text-gray-600';
    emoji = '🤝';
  } else if (isWinner) {
    resultText = 'You Won!';
    resultColor = 'text-green-600';
    emoji = '🎉';
  } else {
    resultText = 'You Lost!';
    resultColor = 'text-red-600';
    emoji = '☠️';
  }

  useEffect(() => {
    const sound = getSoundManager();

    if (isWinner) {
      // Play victory sound
      sound?.playVictory();

      // Confetti celebration
      const duration = 3000;
      const end = Date.now() + duration;

      const colors = ['#a855f7', '#ec4899', '#f43f5e', '#8b5cf6'];

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();

      // Big burst
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: colors,
        });
      }, 500);
    } else if (!isTie) {
      // Play defeat sound
      sound?.playDefeat();

      // Create falling tears
      const tearArray = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 2}s`,
        duration: `${2 + Math.random() * 2}s`,
      }));
      setTears(tearArray);
    } else {
      // Play tie sound
      sound?.playTie();
    }
  }, [isWinner, isTie]);

  return (
    <div className="relative">
      {/* Falling tears animation for losing */}
      {!isWinner && !isTie && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {tears.map((tear) => (
            <div
              key={tear.id}
              className="absolute text-5xl animate-tears-fall drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]"
              style={{
                left: tear.left,
                top: '-50px',
                animationDelay: tear.delay,
                animationDuration: tear.duration,
              }}
            >
              💧
            </div>
          ))}
        </div>
      )}

      <div className={`glass-strong rounded-3xl p-14 max-w-lg w-full text-center relative z-10 shadow-2xl rgb-border holographic-card ${isWinner ? 'animate-zoom-in-3d card-3d' : !isTie ? 'animate-zoom-in-3d card-3d' : 'animate-zoom-in-3d card-3d'}`}
           style={{
             boxShadow: isWinner
               ? '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 50px rgba(34, 197, 94, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.1)'
               : !isTie
               ? '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 50px rgba(239, 68, 68, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.1)'
               : '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(168, 85, 247, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)',
           }}>
        <div className={`text-9xl mb-8 ${isWinner ? 'animate-bounce' : !isTie ? 'animate-wiggle animate-glitch' : ''} drop-shadow-[0_0_50px_rgba(255,255,255,1)]`}
             style={{ filter: 'brightness(1.8)' }}>
          {emoji}
        </div>

        <div className={`bg-black/80 px-12 py-6 rounded-2xl backdrop-blur-sm inline-block mb-6 ${isWinner ? 'animate-pulse' : ''}`}>
          <h2 className="text-6xl font-black text-white mb-0"
              style={{
                textShadow: isWinner
                  ? `
                    0 0 30px #00ff00,
                    0 0 60px #00ff00,
                    0 0 90px #00ff00,
                    4px 4px 0 #000,
                    -4px -4px 0 #000,
                    4px -4px 0 #000,
                    -4px 4px 0 #000
                  `
                  : !isTie
                  ? `
                    0 0 30px #ff0000,
                    0 0 60px #ff0000,
                    0 0 90px #ff0000,
                    4px 4px 0 #000,
                    -4px -4px 0 #000,
                    4px -4px 0 #000,
                    -4px 4px 0 #000
                  `
                  : `
                    0 0 30px #ffff00,
                    0 0 60px #ffff00,
                    0 0 90px #ffff00,
                    4px 4px 0 #000,
                    -4px -4px 0 #000,
                    4px -4px 0 #000,
                    -4px 4px 0 #000
                  `,
              }}>
            {resultText}
          </h2>
        </div>

        {!isWinner && !isTie && (
          <div className="bg-black/80 px-6 py-3 rounded-xl backdrop-blur-sm inline-block mb-6">
            <p className="text-2xl italic font-bold text-white mb-0"
               style={{
                 textShadow: `
                   0 0 10px #ff00ff,
                   0 0 20px #ff00ff,
                   2px 2px 0 #000,
                   -2px -2px 0 #000
                 `,
               }}>
              💀 WASTED 💀
            </p>
            <p className="text-lg text-white/80 mt-2 mb-0">
              Git gud, scrub!
            </p>
          </div>
        )}

        {isWinner && (
          <div className="bg-black/80 px-6 py-3 rounded-xl backdrop-blur-sm inline-block mb-6">
            <p className="text-2xl font-bold text-white mb-0"
               style={{
                 textShadow: `
                   0 0 15px #00ff00,
                   0 0 30px #00ff00,
                   2px 2px 0 #000,
                   -2px -2px 0 #000
                 `,
               }}>
              🎊 LEGENDARY VICTORY! 🎊
            </p>
          </div>
        )}

        <div className="glass rounded-3xl p-8 mb-8 animate-slide-up border-2 border-purple-400/50"
             style={{
               boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(168, 85, 247, 0.4)',
             }}>
          <h3 className="text-2xl text-purple-200 mb-5 font-semibold neon-text">FINAL SCORE</h3>
          <div className="flex justify-around text-center">
            <div>
              <p className="text-lg text-purple-200 mb-2 font-semibold"
                 style={{
                   textShadow: '0 0 10px rgba(168, 85, 247, 0.5)',
                 }}>{playerName.toUpperCase()}</p>
              <p className="text-6xl font-bold text-white neon-text">
                {gameOverData.player1Score}
              </p>
            </div>
            <div className="text-4xl text-purple-300 flex items-center neon-text">-</div>
            <div>
              <p className="text-lg text-purple-200 mb-2 font-semibold"
                 style={{
                   textShadow: '0 0 10px rgba(168, 85, 247, 0.5)',
                 }}>{opponentName.toUpperCase()}</p>
              <p className="text-6xl font-bold text-white neon-text">
                {gameOverData.player2Score}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onReturnToLobby}
          className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-bold py-5 px-10 rounded-full text-2xl hover:shadow-2xl transform hover:scale-110 hover:-translate-y-2 transition-all duration-300 w-full overflow-hidden group rgb-border"
          style={{
            boxShadow: '0 10px 40px rgba(168, 85, 247, 0.6)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          <span className="relative z-10 drop-shadow-lg rgb-text">PLAY AGAIN 🚀</span>
        </button>
      </div>
    </div>
  );
}
