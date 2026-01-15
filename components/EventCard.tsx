import { EventCard as EventCardType } from '@/lib/types';

interface EventCardProps {
  eventCard: EventCardType;
}

export default function EventCard({ eventCard }: EventCardProps) {
  return (
    <div className="relative group animate-zoom-in-3d mb-8">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/40 to-orange-500/40 rounded-2xl blur-2xl animate-pulse"></div>

      {/* Card */}
      <div className="relative glass-strong rounded-2xl p-6 border-4 border-yellow-500/70 transform hover:scale-105 transition-all duration-300"
           style={{
             boxShadow: '0 10px 40px rgba(234, 179, 8, 0.6), inset 0 0 30px rgba(234, 179, 8, 0.2)',
           }}>
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="text-4xl animate-bounce" style={{ filter: 'brightness(2) drop-shadow(0 0 20px rgba(255,215,0,1))' }}>
            ⚡
          </div>
          <div className="bg-black/80 px-6 py-2 rounded-xl">
            <p className="text-xl font-black text-white mb-0"
               style={{
                 textShadow: `
                   0 0 15px #ffff00,
                   0 0 30px #ffff00,
                   2px 2px 0 #000,
                   -2px -2px 0 #000
                 `,
               }}>
              EVENT CARD
            </p>
          </div>
          <div className="text-4xl animate-bounce" style={{ filter: 'brightness(2) drop-shadow(0 0 20px rgba(255,215,0,1))' }}>
            ⚡
          </div>
        </div>

        {/* Card Content */}
        <div className="text-center">
          <div className="text-7xl mb-3 animate-pulse" style={{ filter: 'brightness(2) drop-shadow(0 0 30px rgba(255,215,0,1))' }}>
            {eventCard.emoji}
          </div>
          <div className="bg-black/90 px-6 py-3 rounded-xl mb-3">
            <h3 className="text-3xl font-black text-white mb-0"
                style={{
                  textShadow: `
                    0 0 20px #ff6600,
                    0 0 40px #ff6600,
                    3px 3px 0 #000,
                    -3px -3px 0 #000
                  `,
                }}>
              {eventCard.name}
            </h3>
          </div>
          <div className="bg-black/80 px-4 py-2 rounded-xl">
            <p className="text-lg font-bold text-white mb-0"
               style={{
                 textShadow: `
                   0 0 10px #ffff00,
                   0 0 20px #ffff00,
                   2px 2px 0 #000,
                   -2px -2px 0 #000
                 `,
               }}>
              {eventCard.description}
            </p>
          </div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-yellow-400 animate-pulse"></div>
        <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-yellow-400 animate-pulse" style={{ animationDelay: '500ms' }}></div>
        <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-yellow-400 animate-pulse" style={{ animationDelay: '1000ms' }}></div>
        <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-yellow-400 animate-pulse" style={{ animationDelay: '1500ms' }}></div>
      </div>
    </div>
  );
}
