'use client';

import { useEffect, useState } from 'react';

export default function GamingRoomBackground() {
  const [particles, setParticles] = useState<Array<{ id: number; left: string; delay: string; duration: string; size: string }>>([]);
  const [floatingIcons, setFloatingIcons] = useState<Array<{ id: number; icon: string; left: string; top: string; delay: string }>>([]);
  const [matrixCode, setMatrixCode] = useState<Array<{ id: number; left: string; delay: string; duration: string; code: string }>>([]);

  useEffect(() => {
    // Generate particles
    const particleArray = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 20}s`,
      duration: `${15 + Math.random() * 10}s`,
      size: `${Math.random() * 3 + 1}px`,
    }));
    setParticles(particleArray);

    // Generate floating gaming icons
    const icons = ['🎮', '🎯', '🎲', '🏆', '⭐', '💎', '🔥', '⚡'];
    const iconArray = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      icon: icons[Math.floor(Math.random() * icons.length)],
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
    }));
    setFloatingIcons(iconArray);

    // Generate matrix code rain
    const codeChars = '01アイウエオカキクケコサシスセソ';
    const matrixArray = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${10 + Math.random() * 10}s`,
      code: Array.from({ length: 15 }, () => codeChars[Math.floor(Math.random() * codeChars.length)]).join(''),
    }));
    setMatrixCode(matrixArray);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep space background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900"></div>

      {/* CRT Scanlines */}
      <div className="absolute inset-0 crt-scanlines"></div>

      {/* Animated scanline */}
      <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scanline opacity-30"></div>

      {/* RGB LED strips - Top */}
      <div className="absolute top-0 left-0 right-0 h-1 rgb-border"></div>
      <div className="absolute top-2 left-0 right-0 h-px bg-gradient-to-r from-red-500 via-blue-500 to-green-500 opacity-50"></div>

      {/* RGB LED strips - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 rgb-border"></div>
      <div className="absolute bottom-2 left-0 right-0 h-px bg-gradient-to-r from-green-500 via-purple-500 to-red-500 opacity-50"></div>

      {/* RGB LED strips - Sides */}
      <div className="absolute top-0 bottom-0 left-0 w-1 rgb-border"></div>
      <div className="absolute top-0 bottom-0 right-0 w-1 rgb-border"></div>

      {/* Corner LED accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 rgb-border"></div>
      <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 rgb-border" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 rgb-border" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 rgb-border" style={{ animationDelay: '1.5s' }}></div>

      {/* Lightning flashes */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-400 blur-[100px] animate-lightning opacity-0"></div>
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-400 blur-[100px] animate-lightning opacity-0" style={{ animationDelay: '2.5s' }}></div>

      {/* Matrix code rain */}
      <div className="absolute inset-0">
        {matrixCode.map((item) => (
          <div
            key={item.id}
            className="absolute text-green-500 font-mono text-xs opacity-30 animate-matrix-fall"
            style={{
              left: item.left,
              animationDelay: item.delay,
              animationDuration: item.duration,
              textShadow: '0 0 10px #00ff00',
              writingMode: 'vertical-rl',
            }}
          >
            {item.code}
          </div>
        ))}
      </div>

      {/* Animated grid floor (3D perspective) */}
      <div className="absolute bottom-0 left-0 right-0 h-[60vh] opacity-20"
           style={{
             background: `
               linear-gradient(to bottom, transparent 0%, rgba(168, 85, 247, 0.2) 100%),
               repeating-linear-gradient(
                 0deg,
                 rgba(168, 85, 247, 0.3) 0px,
                 transparent 1px,
                 transparent 40px,
                 rgba(168, 85, 247, 0.3) 41px
               ),
               repeating-linear-gradient(
                 90deg,
                 rgba(236, 72, 153, 0.3) 0px,
                 transparent 1px,
                 transparent 40px,
                 rgba(236, 72, 153, 0.3) 41px
               )
             `,
             transform: 'perspective(500px) rotateX(60deg)',
             transformOrigin: 'bottom',
           }}>
      </div>

      {/* Neon vertical lines */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px opacity-30 animate-neon-pulse"
            style={{
              left: `${(i + 1) * 12.5}%`,
              background: 'linear-gradient(to bottom, transparent, rgba(168, 85, 247, 0.8), transparent)',
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-purple-400 animate-particles"
            style={{
              left: particle.left,
              width: particle.size,
              height: particle.size,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
              boxShadow: '0 0 10px rgba(168, 85, 247, 0.8)',
            }}
          />
        ))}
      </div>

      {/* Floating gaming icons */}
      <div className="absolute inset-0">
        {floatingIcons.map((item) => (
          <div
            key={item.id}
            className="absolute text-4xl opacity-10 animate-float3d"
            style={{
              left: item.left,
              top: item.top,
              animationDelay: item.delay,
              filter: 'blur(1px)',
            }}
          >
            {item.icon}
          </div>
        ))}
      </div>

      {/* Top ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[40%] bg-purple-500/20 blur-[100px] rounded-full"></div>

      {/* Side neon lights */}
      <div className="absolute top-1/4 left-0 w-32 h-64 bg-purple-500/30 blur-[80px] animate-pulse"></div>
      <div className="absolute top-1/4 right-0 w-32 h-64 bg-pink-500/30 blur-[80px] animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Rotating 3D shapes in background */}
      <div className="absolute top-20 left-20 w-40 h-40 opacity-10">
        <div className="w-full h-full border-4 border-purple-400 rounded-lg animate-rotate-3d"
             style={{ transformStyle: 'preserve-3d' }}></div>
      </div>
      <div className="absolute bottom-20 right-20 w-32 h-32 opacity-10">
        <div className="w-full h-full border-4 border-pink-400 rounded-full animate-drift"
             style={{ transformStyle: 'preserve-3d' }}></div>
      </div>

      {/* Vignette effect */}
      <div className="absolute inset-0"
           style={{
             background: 'radial-gradient(circle at center, transparent 0%, transparent 50%, rgba(0, 0, 0, 0.5) 100%)',
           }}></div>
    </div>
  );
}
