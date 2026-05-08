import { create } from 'zustand';
import { GameBoard } from '../engine/GameBoard';
import type { Grid } from '../engine/GameBoard';
import { getRandomBlocks } from '../engine/blocks';
import type { Block } from '../engine/blocks';
import { calculateBaseScore, calculateLineScore } from '../engine/scoring';
import { audioManager } from '../engine/audio';

interface FloatingText {
  id: number;
  text: string;
  x: number;
  y: number;
}

interface GameState {
  grid: Grid;
  score: number;
  combo: number;
  availableBlocks: (Block | null)[];
  isGameOver: boolean;
  floatingTexts: FloatingText[];

  attemptPlaceBlock: (blockIndex: number, startRow: number, startCol: number, clientX?: number, clientY?: number) => boolean;
  removeFloatingText: (id: number) => void;
  resetGame: () => void;
}

let nextTextId = 0;

export const useGameStore = create<GameState>((set, get) => ({
  grid: GameBoard.createEmptyGrid(),
  score: 0,
  combo: 0,
  availableBlocks: getRandomBlocks(3),
  isGameOver: false,
  floatingTexts: [],

  attemptPlaceBlock: (blockIndex, startRow, startCol, clientX = window.innerWidth / 2, clientY = window.innerHeight / 2) => {
    const state = get();
    if (state.isGameOver) return false;

    const block = state.availableBlocks[blockIndex];
    if (!block) return false;

    if (!GameBoard.canPlace(state.grid, block.shape, startRow, startCol)) {
      return false;
    }

    let newGrid = GameBoard.placeBlock(state.grid, block.shape, startRow, startCol);
    const basePoints = calculateBaseScore(block.shape);
    let newScore = state.score + basePoints;

    const { newGrid: clearedGrid, linesCleared } = GameBoard.clearLines(newGrid);
    newGrid = clearedGrid;

    let newCombo = state.combo;
    const newFloatingTexts = [...state.floatingTexts];

    if (linesCleared > 0) {
      audioManager.playClearSound(newCombo + 1);
      newCombo += 1;
      const linePoints = calculateLineScore(linesCleared, newCombo);
      newScore += linePoints;
      
      newFloatingTexts.push({
        id: nextTextId++,
        text: `+${linePoints} (${linesCleared} Lines!)`,
        x: clientX,
        y: clientY - 30,
      });

      if (newCombo > 1) {
        newFloatingTexts.push({
          id: nextTextId++,
          text: `Combo x${newCombo}!`,
          x: clientX,
          y: clientY - 70,
        });
      }
    } else {
      audioManager.playPlaceSound();
      newCombo = 0;
      newFloatingTexts.push({
        id: nextTextId++,
        text: `+${basePoints}`,
        x: clientX,
        y: clientY - 10,
      });
    }

    const newAvailableBlocks = [...state.availableBlocks];
    newAvailableBlocks[blockIndex] = null;

    let nextBlocks = newAvailableBlocks;
    if (nextBlocks.every(b => b === null)) {
      nextBlocks = getRandomBlocks(3);
    }

    const remainingShapes = nextBlocks.filter(b => b !== null).map(b => b!.shape);
    const gameOver = GameBoard.checkGameOver(newGrid, remainingShapes);

    if (gameOver && !state.isGameOver) {
      audioManager.playGameOverSound();
    }

    set({
      grid: newGrid,
      score: newScore,
      combo: newCombo,
      availableBlocks: nextBlocks,
      isGameOver: gameOver,
      floatingTexts: newFloatingTexts,
    });

    return true;
  },

  removeFloatingText: (id) => {
    set(state => ({
      floatingTexts: state.floatingTexts.filter(t => t.id !== id)
    }));
  },

  resetGame: () => {
    set({
      grid: GameBoard.createEmptyGrid(),
      score: 0,
      combo: 0,
      availableBlocks: getRandomBlocks(3),
      isGameOver: false,
      floatingTexts: [],
    });
  }
}));
