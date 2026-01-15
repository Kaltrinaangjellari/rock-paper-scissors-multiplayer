'use client';

import { useState } from 'react';
import { getSoundManager } from '@/lib/sounds';

interface NameInputProps {
  onSubmit: (name: string) => void;
}

export default function NameInput({ onSubmit }: NameInputProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length >= 2) {
      const sound = getSoundManager();
      sound?.playClick();
      onSubmit(name.trim());
    }
  };

  return (
    <div className="glass-strong rounded-3xl p-16 max-w-2xl w-full text-center animate-zoom-in-3d card-3d shadow-2xl rgb-border holographic-card"
         style={{
           boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(168, 85, 247, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)',
         }}>

      {/* Title */}
      <div className="mb-10">
        <div className="text-7xl mb-6 animate-float3d" style={{ filter: 'brightness(1.8) drop-shadow(0 0 30px rgba(168,85,247,1))' }}>
          👤
        </div>
        <div className="bg-black/80 px-10 py-5 rounded-2xl backdrop-blur-sm inline-block">
          <h2 className="text-5xl font-black text-white mb-0"
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
            ENTER YOUR NAME
          </h2>
        </div>
      </div>

      {/* Name Input Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="relative">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your gaming name..."
            maxLength={20}
            autoFocus
            className="w-full px-8 py-6 text-3xl font-black text-white text-center rounded-2xl border-4 border-purple-500/50 bg-black/60 backdrop-blur-sm focus:outline-none focus:border-pink-500 focus:scale-105 transition-all duration-300"
            style={{
              textShadow: `
                0 0 10px #ff00ff,
                0 0 20px #ff00ff,
                2px 2px 0 #000,
                -2px -2px 0 #000
              `,
              boxShadow: '0 10px 40px rgba(168, 85, 247, 0.4), inset 0 0 20px rgba(168, 85, 247, 0.2)',
            }}
          />
          <div className="absolute -bottom-6 right-4 text-sm text-white/60 font-bold">
            {name.length}/20
          </div>
        </div>

        {/* Submit Button */}
        <div className="relative group">
          <div className="absolute inset-0 rounded-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"
               style={{
                 boxShadow: `
                   0 0 60px 20px rgba(168, 85, 247, 0.4),
                   0 0 100px 40px rgba(236, 72, 153, 0.3),
                   inset 0 0 60px rgba(168, 85, 247, 0.2)
                 `,
               }}></div>

          <button
            type="submit"
            disabled={name.trim().length < 2}
            className="relative w-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-black py-6 px-16 rounded-3xl text-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden border-4 border-white/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.1)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

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
              {name.trim().length < 2 ? 'NAME TOO SHORT' : 'CONTINUE ⚡'}
            </span>
          </button>
        </div>
      </form>

      {/* Tips */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full"></div>
        <p className="text-sm text-white/60 font-semibold tracking-wider">MIN 2 CHARACTERS</p>
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent rounded-full"></div>
      </div>
    </div>
  );
}
