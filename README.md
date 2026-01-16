# Rock Paper Scissors - Multiplayer Game

A real-time multiplayer Rock Paper Scissors game built with Next.js 14, React, and Socket.io.

## Live Demo

🎮 **Play now**: [https://rock-paper-scissors-multiplayer-blue.vercel.app](https://rock-paper-scissors-multiplayer-blue.vercel.app)

## Repository

📦 **GitHub**: [https://github.com/Kaltrinaangjellari/rock-paper-scissors-multiplayer](https://github.com/Kaltrinaangjellari/rock-paper-scissors-multiplayer)

## Features

- Real-time multiplayer gameplay
- Automatic matchmaking system
- Best of 3 rounds format
- Clean, responsive UI with Tailwind CSS
- Socket.io for real-time communication

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **Real-time**: Socket.io
- **Server**: Custom Node.js server with Socket.io integration

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in multiple browser windows/tabs to test multiplayer functionality.

## How to Play

1. Click "Play Now" on the landing page
2. Wait in the lobby to be matched with another player
3. Choose rock, paper, or scissors each round
4. Best of 3 rounds wins the game
5. Click "Play Again" to return to the lobby

## Game Rules

- Rock beats Scissors
- Scissors beats Paper
- Paper beats Rock
- Same choice results in a tie

## Project Structure

```
├── app/                # Next.js App Router pages
├── components/         # React components
├── lib/               # Utilities and types
├── server.js          # Custom Socket.io server
└── package.json       # Dependencies
```

## Development

The custom server (`server.js`) handles both the Next.js application and Socket.io connections, providing seamless real-time communication.

## Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel --prod
```

The project is configured to work seamlessly with Vercel's deployment platform.

## Production Build

```bash
npm run build
npm start
```
