import type { BlockShape } from './blocks';

export function calculateBaseScore(shape: BlockShape): number {
  let score = 0;
  for (const row of shape) {
    for (const cell of row) {
      if (cell !== 0) score++;
    }
  }
  return score;
}

export function calculateLineScore(linesCleared: number, currentCombo: number): number {
  if (linesCleared === 0) return 0;
  const baseLineScore = 10;
  const comboMultiplier = currentCombo > 0 ? currentCombo : 1;
  return (baseLineScore * linesCleared) * comboMultiplier;
}
