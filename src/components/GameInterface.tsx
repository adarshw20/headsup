import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, SkipForward, ArrowRight, Timer, Trophy, RotateCcw, BarChart2, X } from 'lucide-react';
import { Team, GameState, RoundResult } from '../types';

interface GameInterfaceProps {
  teams: Team[];
  onGameEnd: (finalTeams: Team[]) => void;
  onReset: () => void;
}

export const GameInterface: React.FC<GameInterfaceProps> = ({ teams: initialTeams, onGameEnd, onReset }) => {
  const [teams, setTeams] = useState<Team[]>(() => 
    initialTeams.map(team => ({
      ...team,
      history: {
        roundsPlayed: 0,
        totalWordsGuessed: 0,
        bestRound: 0
      }
    }))
  );
  
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    currentRound: 1,
    currentTeam: 0,
    currentWordIndex: 0,
    timeLeft: 90,
    roundScore: 0,
    roundHistory: [],
    showResults: false
  });

  const currentTeam = teams[gameState.currentTeam];
  const currentWord = currentTeam.words[gameState.currentWordIndex];

  const startRound = () => {
    if (currentTeam.words.length === 0) {
      alert(`${currentTeam.name} has no more words!`);
      return;
    }

    // If want to increase decrease time thenn Change left time in Seconds
    
    setGameState(prev => ({ ...prev, isPlaying: true, timeLeft: 90, roundScore: 0 }));
  };

  const pauseRound = () => {
    setGameState(prev => ({ ...prev, isPlaying: false }));
  };

  const endRound = useCallback(() => {
    const currentTeamObj = teams[gameState.currentTeam];
    const roundResult: RoundResult = {
      roundNumber: gameState.currentRound,
      teamScores: {
        [currentTeamObj.name]: gameState.roundScore
      },
      wordsGuessed: gameState.roundScore,
      timestamp: Date.now()
    };

    setTeams(prevTeams => 
      prevTeams.map((team, index) => {
        if (index === gameState.currentTeam) {
          const newBestRound = Math.max(team.history.bestRound, gameState.roundScore);
          return {
            ...team,
            score: team.score + gameState.roundScore,
            history: {
              roundsPlayed: team.history.roundsPlayed + 1,
              totalWordsGuessed: team.history.totalWordsGuessed + gameState.roundScore,
              bestRound: newBestRound
            }
          };
        }
        return team;
      })
    );

    setGameState(prev => ({
      ...prev,
      isPlaying: false,
      roundHistory: [...prev.roundHistory, roundResult]
    }));
  }, [gameState.currentTeam, gameState.currentRound, gameState.roundScore, teams]);

  const nextWord = () => {
    if (!gameState.isPlaying) return;

    // Update both teams and game state in a single batch
    setTeams(prevTeams => {
      const updatedTeams = prevTeams.map((team, index) => 
        index === gameState.currentTeam 
          ? { ...team, words: team.words.filter((_, i) => i !== gameState.currentWordIndex) }
          : team
      );
      
      // Update game state after teams are updated
      setGameState(prev => ({ 
        ...prev, 
        roundScore: prev.roundScore + 1,
        currentWordIndex: prev.currentWordIndex >= updatedTeams[gameState.currentTeam].words.length ? 0 : prev.currentWordIndex
      }));
      
      return updatedTeams;
    });
  };

  const skipWord = () => {
    if (!gameState.isPlaying) return;

    // Update both teams and game state in a single batch
    setTeams(prevTeams => {
      const updatedTeams = prevTeams.map((team, index) => 
        index === gameState.currentTeam 
          ? { ...team, words: team.words.filter((_, i) => i !== gameState.currentWordIndex) }
          : team
      );
      
      // Update game state after teams are updated
      setGameState(prev => ({ 
        ...prev, 
        currentWordIndex: prev.currentWordIndex >= updatedTeams[gameState.currentTeam].words.length ? 0 : prev.currentWordIndex
      }));
      
      return updatedTeams;
    });
  };

  const switchTeam = () => {
    setGameState(prev => ({
      ...prev,
      currentTeam: prev.currentTeam === 0 ? 1 : 0,
      currentWordIndex: 0,
      timeLeft: 90,
      roundScore: 0
    }));
  };

  const nextRound = () => {
    setGameState(prev => ({
      ...prev,
      currentRound: prev.currentRound + 1,
      currentTeam: 0,
      currentWordIndex: 0,
      timeLeft: 90,
      roundScore: 0
    }));
  };

  const toggleResults = () => {
    setGameState(prev => ({
      ...prev,
      showResults: !prev.showResults
    }));
  };

  // Timer effect
  useEffect(() => {
    if (gameState.isPlaying && gameState.timeLeft > 0) {
      const timer = setTimeout(() => {
        setGameState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (gameState.timeLeft === 0 && gameState.isPlaying) {
      endRound();
    }
  }, [gameState.isPlaying, gameState.timeLeft, endRound]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const buttonColorClasses = {
    blue: 'from-blue-500 to-blue-600',
    red: 'from-red-500 to-red-600'
  };
  
  const teamColorClasses = {
    blue: 'from-blue-500 to-blue-600 border-blue-300',
    red: 'from-red-500 to-red-600 border-red-300'
  };

  // Results Modal
  const ResultsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Game Results</h2>
          <button 
            onClick={toggleResults}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {teams.map((team, index) => (
            <div key={index} className={`bg-gradient-to-r ${
              team.color === 'blue' ? 'from-blue-500 to-blue-600' : 'from-red-500 to-red-600'
            } text-white p-6 rounded-xl`}>
              <h3 className="text-2xl font-bold mb-4">{team.name} Stats</h3>
              <div className="space-y-2">
                <p>Total Score: <span className="font-bold">{team.score}</span></p>
                <p>Rounds Played: <span className="font-bold">{team.history.roundsPlayed}</span></p>
                <p>Best Round: <span className="font-bold">{team.history.bestRound}</span></p>
                <p>Average Score: <span className="font-bold">
                  {team.history.roundsPlayed > 0 
                    ? (team.history.totalWordsGuessed / team.history.roundsPlayed).toFixed(1) 
                    : '0'}
                </span></p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Round History</h3>
          {gameState.roundHistory.length > 0 ? (
            <div className="space-y-3">
              {gameState.roundHistory.map((round, idx) => (
                <div key={idx} className="border-b pb-2 last:border-0">
                  <div className="font-medium">Round {round.roundNumber}</div>
                  <div className="text-sm text-gray-600">
                    {Object.entries(round.teamScores).map(([teamName, score]) => (
                      <div key={teamName}>
                        {teamName}: {score} words
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No rounds played yet</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      {gameState.showResults && <ResultsModal />}
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Heads Up!</h1>
            <div className="text-xl text-gray-600">Round {gameState.currentRound}</div>
          </div>
          <button
            onClick={toggleResults}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <BarChart2 className="w-5 h-5" />
            View Results
          </button>
        </div>

        {/* Score Display */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {teams.map((team, index) => (
            <div key={index} className={`relative p-6 rounded-xl shadow-lg border-2 ${
              index === gameState.currentTeam ? 'ring-4 ring-yellow-400 ring-opacity-50' : ''
            } ${teamColorClasses[team.color as keyof typeof teamColorClasses]} bg-gradient-to-r text-white`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">{team.name}</h3>
                  <div className="text-sm opacity-90">Words left: {team.words.length}</div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">{team.score}</div>
                  <div className="text-sm opacity-90">Points</div>
                </div>
              </div>
              {index === gameState.currentTeam && (
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
                  Current Turn
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Game Area */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {/* Timer */}
          <div className="text-center mb-6">
            <div className={`inline-flex items-center px-6 py-3 rounded-full text-3xl font-bold ${
              gameState.timeLeft <= 10 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
            }`}>
              <Timer className="w-8 h-8 mr-3" />
              {formatTime(gameState.timeLeft)}
            </div>
          </div>

          {/* Current Word */}
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-gray-800 mb-4 min-h-[80px] flex items-center justify-center">
              {gameState.isPlaying 
                ? (currentWord || 'No more words!')
                : 'Press Start to begin'
              }
            </div>
            {gameState.isPlaying && (
              <div className="text-lg text-gray-600">
                Current round score: <span className="font-bold text-2xl">{gameState.roundScore}</span>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-6">
            {!gameState.isPlaying ? (
              <button
                onClick={startRound}
                disabled={!currentWord}
                className={`inline-flex items-center px-8 py-4 text-white text-xl font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                  buttonColorClasses[currentTeam.color as keyof typeof buttonColorClasses]
                }`}
              >
                <Play className="w-6 h-6 mr-3" />
                Start Round
              </button>
            ) : (
              <>
                <button
                  onClick={pauseRound}
                  className="inline-flex items-center px-6 py-4 bg-yellow-500 hover:bg-yellow-600 text-white text-xl font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Pause className="w-6 h-6 mr-3" />
                  Pause
                </button>
                
                <button
                  onClick={skipWord}
                  disabled={!currentWord}
                  className="inline-flex items-center px-6 py-4 bg-gray-500 hover:bg-gray-600 text-white text-xl font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  <SkipForward className="w-6 h-6 mr-3" />
                  Skip
                </button>

                <button
                  onClick={nextWord}
                  disabled={!currentWord}
                  className="inline-flex items-center px-6 py-4 bg-green-500 hover:bg-green-600 text-white text-xl font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  <ArrowRight className="w-6 h-6 mr-3" />
                  Next (Point!)
                </button>
              </>
            )}
          </div>
        </div>

        {/* Round Management */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={switchTeam}
            disabled={gameState.isPlaying}
            className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all duration-200 disabled:opacity-50"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Switch Team
          </button>

          <button
            onClick={nextRound}
            disabled={gameState.isPlaying}
            className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-all duration-200 disabled:opacity-50"
          >
            <Trophy className="w-5 h-5 mr-2" />
            Next Round
          </button>

          <button
            onClick={onReset}
            className="inline-flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition-all duration-200"
          >
            Reset Game
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Operator Instructions:</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p><strong>Next (Point!):</strong> Press when word is guessed correctly</p>
              <p><strong>Skip:</strong> Press to skip difficult words (no points)</p>
            </div>
            <div>
              <p><strong>Switch Team:</strong> Change which team is playing</p>
              <p><strong>Next Round:</strong> Start a new round (words won't repeat)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};