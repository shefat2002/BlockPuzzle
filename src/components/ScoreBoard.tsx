import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { motion, AnimatePresence } from 'framer-motion';

export const ScoreBoard: React.FC = () => {
  const score = useGameStore((state) => state.score);
  const bestScore = useGameStore((state) => state.bestScore);
  const combo = useGameStore((state) => state.combo);

  return (
    <div className="flex justify-between items-center w-full max-w-[400px] mb-6 px-4 py-3 bg-gray-800 rounded-xl shadow-lg">
      <div className="flex items-baseline gap-4">
        <div className="flex flex-col">
          <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Score</span>
          <span className="text-3xl font-black text-white leading-none">{score}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-yellow-500/80 text-[10px] font-bold uppercase tracking-wider">Best</span>
          <span className="text-yellow-500 text-xl font-black leading-none">{bestScore}</span>
        </div>
      </div>
      <AnimatePresence>
        {combo > 1 && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="flex flex-col items-end"
          >
            <span className="text-purple-400 text-xs font-bold uppercase tracking-wider">Combo</span>
            <span className="text-2xl font-black text-purple-300">x{combo}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
