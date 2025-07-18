import React, { useState } from 'react';
import { WordUpload } from './components/WordUpload';
import { GameInterface } from './components/GameInterface';
import { Team } from './types';

function App() {
  const [teams, setTeams] = useState<Team[] | null>(null);
  const [gameStarted, setGameStarted] = useState(false);

  const handleWordsUploaded = (uploadedTeams: Team[]) => {
    setTeams(uploadedTeams);
    setGameStarted(true);
  };

  const handleGameEnd = (finalTeams: Team[]) => {
    setTeams(finalTeams);
  };

  const handleReset = () => {
    setTeams(null);
    setGameStarted(false);
  };

  if (!gameStarted || !teams) {
    return <WordUpload onWordsUploaded={handleWordsUploaded} />;
  }

  return (
    <GameInterface 
      teams={teams} 
      onGameEnd={handleGameEnd}
      onReset={handleReset}
    />
  );
}

export default App;