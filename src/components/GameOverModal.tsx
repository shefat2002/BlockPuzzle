import React from 'react';
import { useGameStore } from '../store/useGameStore';

export const GameOverModal: React.FC = () => {
  const isGameOver = useGameStore((state) => state.isGameOver);
  const score = useGameStore((state) => state.score);
  const resetGame = useGameStore((state) => state.resetGame);

  if (!isGameOver) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl flex flex-col items-center max-w-sm w-full">
        <h2 className="text-4xl font-black text-white mb-2">Game Over</h2>
        <p className="text-gray-400 mb-6 text-center">No more valid moves available.</p>
        
        <div className="bg-gray-900 rounded-xl p-4 w-full flex flex-col items-center mb-8">
          <span className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-1">Final Score</span>
          <span className="text-5xl font-black text-purple-400">{score}</span>
        </div>

        <button
          onClick={resetGame}
          className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-colors duration-200 active:scale-95"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};
