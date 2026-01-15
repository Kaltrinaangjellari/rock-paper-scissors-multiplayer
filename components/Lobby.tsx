interface LobbyProps {
  playersWaiting: number;
}

export default function Lobby({ playersWaiting }: LobbyProps) {
  return (
    <div className="glass-strong rounded-3xl p-16 max-w-3xl w-full text-center animate-zoom-in-3d card-3d shadow-2xl rgb-border holographic-card"
         style={{
           boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(168, 85, 247, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)',
         }}>

      {/* Title */}
      <div className="bg-black/80 px-10 py-5 rounded-2xl backdrop-blur-sm mb-12 inline-block">
        <h2 className="text-6xl font-black text-white animate-pulse mb-0"
            style={{
              textShadow: `
                0 0 30px #00ffff,
                0 0 60px #00ffff,
                0 0 90px #00ffff,
                4px 4px 0 #000,
                -4px -4px 0 #000,
                4px -4px 0 #000,
                -4px 4px 0 #000
              `,
            }}>
          MATCHMAKING
        </h2>
      </div>

      {/* Player VS Animation */}
      <div className="flex justify-center items-center gap-10 mb-12">
        {/* You */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/40 to-emerald-500/40 rounded-2xl blur-2xl animate-pulse"></div>
          <div className="relative glass-strong rounded-2xl p-8 border-4 border-green-500/70"
               style={{ boxShadow: '0 10px 40px rgba(34, 197, 94, 0.6), inset 0 0 30px rgba(34, 197, 94, 0.2)' }}>
            <div className="text-8xl mb-3" style={{ filter: 'brightness(2) drop-shadow(0 0 30px rgba(0,255,0,1))' }}>
              👤
            </div>
            <div className="bg-black/80 px-4 py-2 rounded-xl">
              <p className="text-xl font-black text-white mb-0"
                 style={{
                   textShadow: `
                     0 0 10px #00ff00,
                     0 0 20px #00ff00,
                     2px 2px 0 #000,
                     -2px -2px 0 #000
                   `,
                 }}>
                YOU
              </p>
            </div>
          </div>
        </div>

        {/* VS Loader */}
        <div className="relative">
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="animate-spin-slow rounded-full h-32 w-32 border-t-4 border-r-4 rgb-border opacity-50"
                 style={{
                   boxShadow: '0 0 40px rgba(168, 85, 247, 0.8)',
                 }}></div>
          </div>
          <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 rgb-border"
               style={{
                 boxShadow: '0 0 30px rgba(236, 72, 153, 0.8)',
               }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="bg-black/80 px-4 py-2 rounded-xl">
              <p className="text-3xl font-black text-white mb-0 animate-pulse"
                 style={{
                   textShadow: `
                     0 0 20px #ff00ff,
                     0 0 40px #ff00ff,
                     3px 3px 0 #000,
                     -3px -3px 0 #000
                   `,
                 }}>
                VS
              </p>
            </div>
          </div>
        </div>

        {/* Opponent (searching) */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 to-pink-500/40 rounded-2xl blur-2xl animate-pulse"
               style={{ animationDelay: '500ms' }}></div>
          <div className="relative glass-strong rounded-2xl p-8 border-4 border-purple-500/50 opacity-60"
               style={{ boxShadow: '0 10px 40px rgba(168, 85, 247, 0.4)' }}>
            <div className="text-8xl mb-3 animate-pulse" style={{ filter: 'brightness(1.5) drop-shadow(0 0 30px rgba(168,85,247,1))' }}>
              ❓
            </div>
            <div className="bg-black/80 px-4 py-2 rounded-xl">
              <p className="text-xl font-black text-white mb-0"
                 style={{
                   textShadow: `
                     0 0 10px #ff00ff,
                     0 0 20px #ff00ff,
                     2px 2px 0 #000,
                     -2px -2px 0 #000
                   `,
                 }}>
                ???
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Status Message */}
      <div className="bg-black/80 px-8 py-4 rounded-2xl backdrop-blur-sm mb-8 inline-block">
        <p className="text-2xl font-bold text-white mb-0"
           style={{
             textShadow: `
               0 0 15px #ffff00,
               0 0 30px #ffff00,
               3px 3px 0 #000,
               -3px -3px 0 #000
             `,
           }}>
          {playersWaiting === 0
            ? 'Searching for opponent...'
            : `${playersWaiting} player${playersWaiting > 1 ? 's' : ''} online`}
        </p>
      </div>

      {/* Loading dots */}
      <div className="flex justify-center items-center gap-3">
        <div className="w-5 h-5 rounded-full animate-bounce"
             style={{
               animationDelay: '0ms',
               background: 'linear-gradient(135deg, #a855f7, #ec4899)',
               boxShadow: '0 0 20px rgba(168, 85, 247, 1)'
             }}></div>
        <div className="w-5 h-5 rounded-full animate-bounce"
             style={{
               animationDelay: '150ms',
               background: 'linear-gradient(135deg, #ec4899, #f43f5e)',
               boxShadow: '0 0 20px rgba(236, 72, 153, 1)'
             }}></div>
        <div className="w-5 h-5 rounded-full animate-bounce"
             style={{
               animationDelay: '300ms',
               background: 'linear-gradient(135deg, #f43f5e, #8b5cf6)',
               boxShadow: '0 0 20px rgba(244, 63, 94, 1)'
             }}></div>
      </div>

      {/* Scanning effect */}
      <div className="mt-8 flex items-center justify-center gap-2">
        <div className="text-2xl animate-pulse" style={{ filter: 'brightness(2) drop-shadow(0 0 20px rgba(0,255,255,1))' }}>
          🔍
        </div>
        <div className="h-1 w-40 bg-gradient-to-r from-transparent via-cyan-500 to-transparent rounded-full animate-pulse"></div>
        <div className="text-2xl animate-pulse" style={{ filter: 'brightness(2) drop-shadow(0 0 20px rgba(0,255,255,1))' }}>
          🔍
        </div>
      </div>
    </div>
  );
}
