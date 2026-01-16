# Claude.md - Rock Paper Scissors Multiplayer Game

## Project Overview

This is a real-time multiplayer Rock Paper Scissors game built with Next.js 14, React, TypeScript, and Socket.io. Players are automatically matched and compete in best-of-3 rounds.

**Live Demo**: https://rock-paper-scissors-multiplayer-blue.vercel.app
**Repository**: https://github.com/Kaltrinaangjellari/rock-paper-scissors-multiplayer

## Architecture

### Tech Stack
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Real-time Communication**: Socket.io (client & server)
- **Server**: Custom Node.js server integrating Next.js and Socket.io
- **Deployment**: Vercel

### Project Structure

```
├── app/
│   ├── page.tsx              # Main game page with all game states
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles and animations
├── components/
│   ├── EventCard.tsx         # Special event card display component
│   └── (game UI components embedded in page.tsx)
├── lib/
│   ├── types.ts              # TypeScript type definitions
│   └── socket.ts             # Socket.io client configuration
├── server.js                 # Custom server (Next.js + Socket.io)
├── package.json              # Dependencies and scripts
└── tailwind.config.ts        # Tailwind configuration
```

## Key Components

### Game States
The game uses a single-page architecture with multiple states:

1. **landing** - Welcome screen with "Play Now" button
2. **name_input** - Player enters their name
3. **lobby** - Waiting for opponent (shows player count)
4. **playing** - Active round, players make choices
5. **round_result** - Shows round outcome
6. **game_over** - Final game results

### Socket.io Events

#### Client → Server
- `setPlayerName` - Player sets their name
- `joinLobby` - Player joins matchmaking lobby
- `makeChoice` - Player makes rock/paper/scissors choice

#### Server → Client
- `gameStart` - Game begins with matched opponent
- `roundStart` - New round begins
- `roundResult` - Round outcome with choices and scores
- `gameOver` - Final game results
- `opponentDisconnected` - Opponent left the game
- `lobbyUpdate` - Current lobby player count

### Game Logic

**Matchmaking**: First two players in lobby are automatically paired
**Rounds**: Best of 3 rounds (first to win 2 rounds)
**Choices**: rock, paper, scissors
**Rules**:
- Rock beats Scissors
- Scissors beats Paper
- Paper beats Rock
- Same choice = tie (round replayed)

### Server Implementation (server.js)

The custom server:
1. Creates HTTP server
2. Integrates Next.js request handler
3. Attaches Socket.io for real-time communication
4. Manages game state and matchmaking
5. Handles player connections/disconnections
6. Broadcasts game events to connected players

Key server data structures:
```javascript
const waitingPlayers = []  // Queue for matchmaking
const games = new Map()     // Active games by gameId
const playerToGame = new Map()  // Player → Game mapping
```

## Type Definitions (lib/types.ts)

```typescript
type Choice = 'rock' | 'paper' | 'scissors'
type GameState = 'landing' | 'name_input' | 'lobby' | 'playing' | 'round_result' | 'game_over'

interface GameStartData {
  gameId: string
  playerId: string
  opponentId: string
  playerName: string
  opponentName: string
}

interface RoundResult {
  round: number
  player1Choice: Choice
  player2Choice: Choice
  winner: 'player1' | 'player2' | 'tie'
  player1Score: number
  player2Score: number
}

interface GameOverData {
  winner: string | 'tie'
  player1Score: number
  player2Score: number
}

interface EventCard {
  emoji: string
  name: string
  description: string
}
```

## Styling & Animations

The game features a vibrant, animated UI:
- **Glass morphism effects** for cards and containers
- **3D transformations** on hover
- **Particle animations** for background atmosphere
- **Custom CSS animations**: zoom, float, pulse, glow
- **Gradient backgrounds** with animated patterns
- **Responsive design** for all screen sizes

Key CSS classes:
- `glass` / `glass-strong` - Glassmorphism effects
- `animate-zoom-in-3d` - 3D zoom animation
- `animate-float` - Floating animation
- `animate-pulse-glow` - Glowing pulse effect

## Development

### Running Locally
```bash
npm install
npm run dev
```
Server runs on http://localhost:3000

### Building for Production
```bash
npm run build
npm start
```

### Deployment to Vercel
```bash
vercel login
vercel --prod
```

## Important Files

### server.js
- Custom Node.js server
- Integrates Next.js and Socket.io
- Handles all game logic and matchmaking
- Manages WebSocket connections
- Port: 3000 (configurable via PORT env var)

### app/page.tsx
- Main game component
- Manages all game states
- Handles Socket.io client events
- Renders UI for each game phase
- Contains choice buttons, score display, and game results

### lib/socket.ts
- Socket.io client initialization
- Exports configured socket instance
- Connects to server on component mount

## Environment Variables

- `PORT` - Server port (default: 3000)
- No other environment variables required

## Notes for AI Assistants

1. **Single Page Application**: All game states are managed in `app/page.tsx`
2. **Real-time Sync**: All game state changes are driven by Socket.io events
3. **Automatic Matchmaking**: No manual room selection, players are auto-paired
4. **Reconnection Handling**: If a player disconnects, the opponent is notified
5. **TypeScript**: Full type safety with interfaces in `lib/types.ts`
6. **Custom Server Required**: Vercel automatically handles the custom server setup
7. **No Database**: Game state is ephemeral, stored in server memory only

## Recent Changes

- Added `EventCard` type definition to `lib/types.ts`
- Deployed to Vercel at https://rock-paper-scissors-multiplayer-blue.vercel.app
- Added deployment instructions to README.md
- Configured `.gitignore` to exclude `.claude/settings.local.json`

## Testing Multiplayer

To test locally:
1. Run `npm run dev`
2. Open http://localhost:3000 in two different browser windows/tabs
3. Enter names for both players
4. Both will be matched automatically
5. Play through the game

## Known Limitations

- No persistent storage (games reset on server restart)
- No authentication system
- No game history or statistics
- Games are lost if server restarts
- Limited to 2 players per game (no spectators)
