export interface RoundResult {
  roundNumber: number;
  teamScores: {
    [key: string]: number;
  };
  wordsGuessed: number;
  timestamp: number;
}

export interface Team {
  name: string;
  words: string[];
  score: number;
  color: string;
  history: {
    roundsPlayed: number;
    totalWordsGuessed: number;
    bestRound: number;
  };
}

export interface GameState {
  isPlaying: boolean;
  currentRound: number;
  currentTeam: number;
  currentWordIndex: number;
  timeLeft: number;
  roundScore: number;
  roundHistory: RoundResult[];
  showResults: boolean;
}