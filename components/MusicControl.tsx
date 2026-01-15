'use client';

import { useState } from 'react';
import { getSoundManager } from '@/lib/sounds';

export default function MusicControl() {
  const [volume, setVolume] = useState(15); // 0-100
  const [isExpanded, setIsExpanded] = useState(false);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    const sound = getSoundManager();
    sound?.setMusicVolume(newVolume / 100);
  };

  const toggleMute = () => {
    const sound = getSoundManager();
    if (volume === 0) {
      setVolume(15);
      sound?.setMusicVolume(0.15);
    } else {
      setVolume(0);
      sound?.setMusicVolume(0);
    }
  };

  const getVolumeIcon = () => {
    if (volume === 0) return '🔇';
    if (volume < 50) return '🔉';
    return '🔊';
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Volume Slider */}
      <div
        className={`glass-strong rounded-full px-6 py-3 rgb-border transition-all duration-300 ${
          isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'
        }`}
        style={{
          boxShadow: '0 10px 40px rgba(168, 85, 247, 0.6)',
        }}
      >
        <div className="flex items-center gap-3">
          <span
            className="text-sm font-black text-white whitespace-nowrap"
            style={{
              textShadow: `
                0 0 10px #ff00ff,
                0 0 20px #ff00ff,
                2px 2px 0 #000,
                -2px -2px 0 #000
              `,
            }}
          >
            {volume}%
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="w-32 h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right,
                #a855f7 0%,
                #ec4899 ${volume}%,
                rgba(255,255,255,0.2) ${volume}%,
                rgba(255,255,255,0.2) 100%)`,
            }}
          />
        </div>
      </div>

      {/* Volume Button */}
      <button
        onClick={toggleMute}
        className="glass-strong rounded-full p-4 hover:scale-110 transition-all duration-300 rgb-border group"
        style={{
          boxShadow: '0 10px 40px rgba(168, 85, 247, 0.6)',
        }}
      >
        <div className="text-3xl" style={{ filter: 'brightness(1.8) drop-shadow(0 0 10px rgba(168,85,247,1))' }}>
          {getVolumeIcon()}
        </div>
        <div
          className="absolute bottom-full mb-2 right-0 bg-black/90 px-3 py-1 rounded-lg text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{
            textShadow: '0 0 10px rgba(168, 85, 247, 0.8)',
          }}
        >
          Music Volume
        </div>
      </button>
    </div>
  );
}
