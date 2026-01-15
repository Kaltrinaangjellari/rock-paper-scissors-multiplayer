import { getSoundManager } from '@/lib/sounds';

interface LandingProps {
  onPlay: () => void;
}

export default function Landing({ onPlay }: LandingProps) {
  const handlePlayClick = () => {
    const sound = getSoundManager();
    sound?.startBackgroundMusic(); // Start music when user first interacts
    sound?.playEpicStart();
    onPlay();
  };
  return (
    <div className="glass-strong rounded-3xl p-16 max-w-2xl w-full text-center animate-zoom-in-3d card-3d shadow-2xl rgb-border holographic-card"
         style={{
           boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(168, 85, 247, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)',
         }}>
      {/* Icon Battle Formation */}
      <div className="relative mb-10">
        <div className="flex justify-center items-center gap-6">
          {/* Rock */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/40 to-pink-500/40 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative glass-strong rounded-2xl p-6 border-2 border-red-500/50 transform hover:scale-110 hover:-rotate-6 transition-all duration-300"
                 style={{ boxShadow: '0 10px 40px rgba(239, 68, 68, 0.4)' }}>
              <div className="text-8xl animate-float3d" style={{ animationDelay: '0s', filter: 'brightness(1.8) drop-shadow(0 0 20px rgba(255,0,0,1))' }}>
                ✊
              </div>
            </div>
          </div>

          {/* VS Text */}
          <div className="text-4xl font-black text-white animate-pulse"
               style={{
                 textShadow: `
                   0 0 20px #ff00ff,
                   0 0 40px #ff00ff,
                   3px 3px 0 #000,
                   -3px -3px 0 #000
                 `,
               }}>
            VS
          </div>

          {/* Paper */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/40 to-emerald-500/40 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative glass-strong rounded-2xl p-6 border-2 border-green-500/50 transform hover:scale-110 hover:rotate-6 transition-all duration-300"
                 style={{ boxShadow: '0 10px 40px rgba(34, 197, 94, 0.4)' }}>
              <div className="text-8xl animate-float3d" style={{ animationDelay: '0.3s', filter: 'brightness(1.8) drop-shadow(0 0 20px rgba(0,255,0,1))' }}>
                ✋
              </div>
            </div>
          </div>

          {/* VS Text */}
          <div className="text-4xl font-black text-white animate-pulse"
               style={{
                 textShadow: `
                   0 0 20px #ff00ff,
                   0 0 40px #ff00ff,
                   3px 3px 0 #000,
                   -3px -3px 0 #000
                 `,
               }}>
            VS
          </div>

          {/* Scissors */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 to-cyan-500/40 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative glass-strong rounded-2xl p-6 border-2 border-cyan-500/50 transform hover:scale-110 hover:-rotate-6 transition-all duration-300"
                 style={{ boxShadow: '0 10px 40px rgba(6, 182, 212, 0.4)' }}>
              <div className="text-8xl animate-float3d" style={{ animationDelay: '0.6s', filter: 'brightness(1.8) drop-shadow(0 0 20px rgba(0,255,255,1))' }}>
                ✌️
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Title */}
      <div className="relative mb-8 px-10 py-6 bg-black/80 rounded-2xl backdrop-blur-sm">
        <h1 className="text-7xl font-black mb-0 text-white relative"
            style={{
              textShadow: `
                0 0 30px #ff00ff,
                0 0 60px #ff00ff,
                0 0 90px #ff00ff,
                4px 4px 0 #000,
                -4px -4px 0 #000,
                4px -4px 0 #000,
                -4px 4px 0 #000
              `,
            }}>
          ROCK PAPER SCISSORS
        </h1>
      </div>

      <div className="bg-black/70 px-6 py-3 rounded-xl backdrop-blur-sm mb-8">
        <p className="text-2xl animate-slide-up font-bold text-white"
           style={{
             animationDelay: '100ms',
             textShadow: `
               0 0 10px #ff00ff,
               0 0 20px #ff00ff,
               2px 2px 0 #000,
               -2px -2px 0 #000
             `,
           }}>
          Challenge players from around the world in real-time!
        </p>
      </div>
      {/* Epic Play Button */}
      <div className="relative group">
        {/* Glow rings */}
        <div className="absolute inset-0 rounded-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"
             style={{
               boxShadow: `
                 0 0 60px 20px rgba(168, 85, 247, 0.4),
                 0 0 100px 40px rgba(236, 72, 153, 0.3),
                 inset 0 0 60px rgba(168, 85, 247, 0.2)
               `,
             }}></div>

        {/* Animated border */}
        <div className="absolute -inset-1 rounded-3xl animate-spin-slow opacity-75 group-hover:opacity-100 transition-opacity duration-300"
             style={{
               background: 'linear-gradient(45deg, #a855f7, #ec4899, #8b5cf6, #a855f7)',
               filter: 'blur(10px)',
             }}></div>

        {/* Main button */}
        <button
          onClick={handlePlayClick}
          className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-black py-6 px-16 rounded-3xl text-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden border-4 border-white/20"
          style={{
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

          {/* Pulse effect */}
          <div className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-100 rounded-3xl transition-transform duration-500"></div>

          {/* Button content */}
          <div className="relative z-10 flex items-center justify-center gap-4">
            <span className="text-5xl animate-pulse" style={{ filter: 'brightness(2) drop-shadow(0 0 10px rgba(255,255,255,1))' }}>
              ⚡
            </span>
            <span style={{
              textShadow: `
                0 0 20px #fff,
                0 0 40px #fff,
                3px 3px 0 #000,
                -3px -3px 0 #000,
                3px -3px 0 #000,
                -3px 3px 0 #000
              `,
            }}>
              PLAY NOW
            </span>
            <span className="text-5xl animate-pulse" style={{ filter: 'brightness(2) drop-shadow(0 0 10px rgba(255,255,255,1))' }}>
              ⚡
            </span>
          </div>
        </button>
      </div>

      {/* Subtitle */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full"></div>
        <p className="text-sm text-white/60 font-semibold tracking-wider">ONLINE MULTIPLAYER</p>
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent rounded-full"></div>
      </div>
    </div>
  );
}
