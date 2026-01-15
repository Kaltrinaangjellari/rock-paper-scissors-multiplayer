import { Choice } from '@/lib/types';
import { getSoundManager } from '@/lib/sounds';

interface GameProps {
  round: number;
  onChoice: (choice: Choice) => void;
  playerChoice: Choice | null;
  waitingForOpponent: boolean;
  playerName: string;
  opponentName: string;
}

export default function Game({ round, onChoice, playerChoice, waitingForOpponent, playerName, opponentName }: GameProps) {
  const handleChoice = (choice: Choice) => {
    const sound = getSoundManager();
    sound?.playChoiceSelect();
    onChoice(choice);
  };
  const choices: Choice[] = ['rock', 'paper', 'scissors'];

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

  return (
    <div className="glass-strong rounded-3xl p-12 max-w-3xl w-full animate-zoom-in-3d card-3d shadow-2xl rgb-border holographic-card"
         style={{
           boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(168, 85, 247, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)',
         }}>
      <div className="text-center mb-10">
        <div className="bg-black/70 px-8 py-4 rounded-2xl backdrop-blur-sm mb-4 inline-block">
          <h2 className="text-5xl font-black text-white mb-0 animate-slide-up"
              style={{
                textShadow: `
                  0 0 20px #ffff00,
                  0 0 40px #ffff00,
                  0 0 60px #ffff00,
                  3px 3px 0 #000,
                  -3px -3px 0 #000,
                  3px -3px 0 #000,
                  -3px 3px 0 #000
                `,
              }}>
            ROUND {round} OF 3
          </h2>
        </div>
        <div className="bg-black/70 px-6 py-2 rounded-xl backdrop-blur-sm inline-block">
          <p className="text-xl animate-slide-up font-bold text-white mb-0"
             style={{
               textShadow: `
                 0 0 10px #00ff00,
                 0 0 20px #00ff00,
                 2px 2px 0 #000,
                 -2px -2px 0 #000
               `,
             }}>
            {playerChoice
              ? waitingForOpponent
                ? 'Waiting for opponent...'
                : 'Choice locked in!'
              : 'Make your choice!'}
          </p>
        </div>
      </div>

      {!playerChoice ? (
        <div className="grid grid-cols-3 gap-8">
          {choices.map((choice, index) => (
            <button
              key={choice}
              onClick={() => handleChoice(choice)}
              className="glass rounded-3xl p-10 hover:glass-strong transform hover:scale-110 hover:-translate-y-4 transition-all duration-300 flex flex-col items-center justify-center aspect-square relative overflow-hidden group animate-zoom-in-3d rgb-border holographic-card"
              style={{
                animationDelay: `${index * 100}ms`,
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(168, 85, 247, 0.4)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-neon-pulse"></div>
              <div className="absolute inset-0 border-4 rgb-border rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                   style={{
                     boxShadow: 'inset 0 0 30px rgba(168, 85, 247, 0.6)',
                   }}></div>
              <span className="text-8xl mb-4 transform group-hover:rotate-12 group-hover:scale-125 transition-all duration-300 animate-float3d drop-shadow-[0_0_30px_rgba(255,255,255,1)] animate-glitch"
                    style={{ filter: 'brightness(1.5)' }}>
                {getEmoji(choice)}
              </span>
              <div className="bg-black/80 px-4 py-2 rounded-xl">
                <span className="text-2xl font-black capitalize relative z-10 text-white"
                      style={{
                        textShadow: `
                          0 0 10px #ff00ff,
                          0 0 20px #ff00ff,
                          2px 2px 0 #000,
                          -2px -2px 0 #000
                        `,
                      }}>{choice}</span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <div className="glass-strong rounded-3xl p-16 mb-8 animate-zoom-in-3d border-2 border-purple-400/50"
               style={{
                 boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(168, 85, 247, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.1)',
               }}>
            <div className="bg-black/80 px-6 py-3 rounded-xl backdrop-blur-sm mb-6 inline-block">
              <p className="text-2xl font-bold text-white mb-0"
                 style={{
                   textShadow: `
                     0 0 10px #00ffff,
                     0 0 20px #00ffff,
                     2px 2px 0 #000,
                     -2px -2px 0 #000
                   `,
                 }}>Your choice:</p>
            </div>
            <div className="text-9xl mb-6 animate-bounce drop-shadow-[0_0_40px_rgba(255,255,255,1)]"
                 style={{ filter: 'brightness(1.5)' }}>{getEmoji(playerChoice)}</div>
            <div className="bg-black/80 px-8 py-3 rounded-xl backdrop-blur-sm inline-block">
              <p className="text-4xl font-black capitalize text-white mb-0"
                 style={{
                   textShadow: `
                     0 0 20px #ff00ff,
                     0 0 40px #ff00ff,
                     3px 3px 0 #000,
                     -3px -3px 0 #000,
                     3px -3px 0 #000,
                     -3px 3px 0 #000
                   `,
                 }}>{playerChoice}</p>
            </div>
          </div>
          {waitingForOpponent && (
            <div className="flex justify-center items-center space-x-4 animate-slide-up">
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 rgb-border"
                   style={{
                     boxShadow: '0 0 20px rgba(168, 85, 247, 0.8)',
                   }}></div>
              <div className="bg-black/80 px-6 py-2 rounded-xl backdrop-blur-sm">
                <p className="text-xl font-bold text-white mb-0"
                   style={{
                     textShadow: `
                       0 0 10px #ffff00,
                       0 0 20px #ffff00,
                       2px 2px 0 #000,
                       -2px -2px 0 #000
                     `,
                   }}>Waiting for opponent...</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
