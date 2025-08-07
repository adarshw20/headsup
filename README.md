# Heads-Up 

A web-based competition game where two teams submit words and compete in timed rounds. Perfect for events, team building, or friendly competitions where you need a neutral operator to manage the game.

## Features

### 🎯 Core Functionality
- **Word Upload**: Each team can upload up to 200 words
- **Timed Rounds**: 90-second rounds with visual countdown timer
- **Neutral Operation**: Designed for a neutral operator to manage the game
- **Smart Scoring**: Next button awards points, Skip button doesn't
- **Word Management**: Used words are automatically removed from future rounds
- **Multi-Round Support**: Play multiple rounds with automatic team switching

### 🎨 User Experience
- **Clean Interface**: Large, readable text optimized for competition use
- **Color-Coded Teams**: Blue and Red team distinction throughout
- **Responsive Design**: Works on tablets, laptops, and desktop screens
- **Real-Time Updates**: Live score tracking and timer display
- **Professional Layout**: Suitable for live events and competitions

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd heads-up-competition-game
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## How to Use

### 1. Setup Phase
1. **Team Names**: Enter custom names for both teams (default: "Team Blue" and "Team Red")
2. **Word Upload**: Each team enters their words, one per line (maximum 200 words per team)
3. **Word Counter**: Real-time display shows how many words each team has entered
4. **Start Competition**: Click the "Start Competition" button when both teams have uploaded their words

### 2. Game Phase
1. **Round Start**: Click "Start Round" to begin the 90-second timer
2. **Word Display**: The current word appears in large text on screen
3. **Operator Controls**:
   - **Next (Point!)**: Press when the word is guessed correctly (awards 1 point)
   - **Skip**: Press to skip difficult words (no points awarded)
   - **Pause**: Temporarily pause the round timer
4. **Round End**: Timer automatically ends the round at 0 seconds
5. **Score Update**: Points are automatically added to the team's total score

### 3. Round Management
- **Switch Team**: Change which team is currently playing
- **Next Round**: Start a new round (used words won't appear again)
- **Reset Game**: Return to the word upload screen to start over

## Game Rules

### Scoring
- ✅ **Correct Guess**: Press "Next" to award 1 point
- ⏭️ **Skip Word**: Press "Skip" for no points (word is still removed)
- ⏱️ **Time Limit**: Each round lasts exactly 90 seconds

### Word Management
- Words are automatically removed after being used (whether skipped or guessed)
- Used words will not appear in subsequent rounds
- Each team can have up to 200 words initially
- Game continues until teams run out of words

### Operator Guidelines
- Remain neutral and don't favor either team
- Press buttons quickly to maintain game flow
- Use "Pause" if there are disputes or technical issues
- Ensure fair play by following the same rules for both teams

## Technical Details

### Built With
- **React 18** - Frontend framework
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server
- **Lucide React** - Beautiful, customizable icons

### Project Structure
```
src/
├── components/
│   ├── WordUpload.tsx      # Team word upload interface
│   └── GameInterface.tsx   # Main game playing interface
├── types.ts                # TypeScript type definitions
├── App.tsx                 # Main application component
├── main.tsx               # Application entry point
└── index.css              # Global styles
```

### Key Components

#### WordUpload Component
- Handles team name input and word upload
- Validates word count and format
- Processes words (trims whitespace, removes empty lines)
- Provides real-time word count feedback

#### GameInterface Component
- Manages game state and timer
- Handles word display and navigation
- Controls scoring and round management
- Provides operator controls and team switching

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Building for Production
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## Deployment

This project can be deployed to any static hosting service:
- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your Git repository
- **GitHub Pages**: Use the built files from `dist`
- **Any web server**: Serve the `dist` folder contents

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions:
1. Check the existing issues in the repository
2. Create a new issue with detailed information about the problem
3. Include steps to reproduce the issue

---

**Perfect for**: Team building events, corporate competitions, family game nights, educational activities, and any scenario where you need a fair, neutral way to manage a word-guessing competition!
