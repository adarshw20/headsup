import React, { useState } from 'react';
import { Upload, Users, ArrowRight } from 'lucide-react';
import { Team } from '../types';

interface WordUploadProps {
  onWordsUploaded: (teams: Team[]) => void;
}

export const WordUpload: React.FC<WordUploadProps> = ({ onWordsUploaded }) => {
  const [team1Words, setTeam1Words] = useState('');
  const [team2Words, setTeam2Words] = useState('');
  const [team1Name, setTeam1Name] = useState('NOVA');
  const [team2Name, setTeam2Name] = useState('ENGIMA');

  const processWords = (text: string): string[] => {
  // Split, trim, filter out blanks, deduplicate, and limit to 200
  const words = text
    .split('\n')
    .map(word => word.trim())
    .filter(word => word.length > 0);
  // Remove duplicates (case-insensitive)
  const uniqueWords = Array.from(new Set(words.map(w => w.toLowerCase()))).map(lower =>
    words.find(w => w.toLowerCase() === lower) as string
  );
  return uniqueWords.slice(0, 200);
};

  const handleStart = () => {
  // Combine both textareas, process, and deduplicate
  const combined = `${team1Words}\n${team2Words}`;
  let sharedWords = processWords(combined);

  // Shuffle the words randomly
  for (let i = sharedWords.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sharedWords[i], sharedWords[j]] = [sharedWords[j], sharedWords[i]];
  }

  if (sharedWords.length === 0) {
    alert('Please enter words for both teams');
    return;
  }

  const teams: Team[] = [
    {
      name: team1Name,
      words: [...sharedWords],
      score: 0,
      color: 'blue',
      history: {
        roundsPlayed: 0,
        totalWordsGuessed: 0,
        bestRound: 0
      }
    },
    {
      name: team2Name,
      words: [...sharedWords],
      score: 0,
      color: 'red',
      history: {
        roundsPlayed: 0,
        totalWordsGuessed: 0,
        bestRound: 0
      }
    }
  ];

  onWordsUploaded(teams);
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Heads-Up Competition</h1>
          </div>
          <p className="text-gray-600 text-lg">Upload words for both teams to start the competition</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Team 1 Upload */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
            <div className="flex items-center mb-4">
              <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
              <h2 className="text-2xl font-bold text-blue-700">NOVA</h2>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team Name
              </label>
              <input
                type="text"
                value={team1Name}
                onChange={(e) => setTeam1Name(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter team name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Words (one per line, max 200)
              </label>
              <textarea
                value={team1Words}
                onChange={(e) => setTeam1Words(e.target.value)}
                rows={12}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                placeholder="Enter words, one per line..."
              />
            </div>
            
            <div className="text-sm text-gray-500">
              Words entered: {processWords(team1Words).length}/200
            </div>
          </div>

          {/* Team 2 Upload */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-red-500">
            <div className="flex items-center mb-4">
              <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
              <h2 className="text-2xl font-bold text-red-700">ENGIMA</h2>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team Name
              </label>
              <input
                type="text"
                value={team2Name}
                onChange={(e) => setTeam2Name(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter team name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Words (one per line, max 200)
              </label>
              <textarea
                value={team2Words}
                onChange={(e) => setTeam2Words(e.target.value)}
                rows={12}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono text-sm"
                placeholder="Enter words, one per line..."
              />
            </div>
            
            <div className="text-sm text-gray-500">
              Words entered: {processWords(team2Words).length}/200
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleStart}
            disabled={processWords(team1Words).length === 0 || processWords(team2Words).length === 0}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-red-600 text-white text-xl font-bold rounded-xl hover:from-blue-700 hover:to-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Upload className="w-6 h-6 mr-3" />
            Start Competition
            <ArrowRight className="w-6 h-6 ml-3" />
          </button>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Game Rules:</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Each round lasts 90 seconds</li>
            <li>• Press "Next" when the word is guessed correctly (adds 1 point)</li>
            <li>• Press "Skip" to move to the next word (no points)</li>
            <li>• Words used in previous rounds won't appear again</li>
            <li>• The operator should remain neutral and not favor either team</li>
          </ul>
        </div>
      </div>
    </div>
  );
};