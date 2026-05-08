import { describe, it, expect } from 'vitest';
import { GameBoard } from './GameBoard';
import { BLOCK_DICTIONARY } from './blocks';
import { calculateBaseScore, calculateLineScore } from './scoring';

describe('GameBoard Engine', () => {
  it('should create an empty 8x8 grid', () => {
    const grid = GameBoard.createEmptyGrid();
    expect(grid.length).toBe(8);
    expect(grid[0].length).toBe(8);
    expect(grid.flat().every(cell => cell === 0)).toBe(true);
  });

  it('canPlace should return true for a valid placement', () => {
    const grid = GameBoard.createEmptyGrid();
    const shape = BLOCK_DICTIONARY.find(b => b.id === '3x3')!.shape;
    expect(GameBoard.canPlace(grid, shape, 0, 0)).toBe(true);
  });

  it('canPlace should return false for out of bounds placement', () => {
    const grid = GameBoard.createEmptyGrid();
    const shape = BLOCK_DICTIONARY.find(b => b.id === '3x3')!.shape;
    expect(GameBoard.canPlace(grid, shape, 6, 6)).toBe(false); // Bottom right will go out
  });

  it('canPlace should return false if it overlaps with an existing block', () => {
    let grid = GameBoard.createEmptyGrid();
    const shape = BLOCK_DICTIONARY.find(b => b.id === '1x1')!.shape;
    grid = GameBoard.placeBlock(grid, shape, 0, 0);
    expect(GameBoard.canPlace(grid, shape, 0, 0)).toBe(false);
  });

  it('placeBlock should place the block correctly', () => {
    const grid = GameBoard.createEmptyGrid();
    const shape = BLOCK_DICTIONARY.find(b => b.id === 'line_h3')!.shape;
    const newGrid = GameBoard.placeBlock(grid, shape, 0, 0);
    expect(newGrid[0][0]).toBe(1);
    expect(newGrid[0][1]).toBe(1);
    expect(newGrid[0][2]).toBe(1);
    expect(newGrid[0][3]).toBe(0);
  });

  it('clearLines should clear full rows and columns', () => {
    let grid = GameBoard.createEmptyGrid();
    // Fill first row
    for(let i = 0; i < 8; i++) grid[0][i] = 1;
    // Fill first col
    for(let i = 0; i < 8; i++) grid[i][0] = 1;

    const { newGrid, linesCleared } = GameBoard.clearLines(grid);
    expect(linesCleared).toBe(2);
    expect(newGrid[0].every(cell => cell === 0)).toBe(true);
    expect(newGrid.every(row => row[0] === 0)).toBe(true);
  });

  it('checkGameOver should return true if no available shapes can be placed', () => {
    let grid = GameBoard.createEmptyGrid();
    // Fill the grid so nothing can be placed
    for(let r = 0; r < 8; r++) {
      for(let c = 0; c < 8; c++) {
        grid[r][c] = 1;
      }
    }
    const availableShapes = [BLOCK_DICTIONARY.find(b => b.id === '1x1')!.shape];
    expect(GameBoard.checkGameOver(grid, availableShapes)).toBe(true);
  });
});

describe('Scoring Logic', () => {
  it('should calculate base score correctly', () => {
    const shape = BLOCK_DICTIONARY.find(b => b.id === '3x3')!.shape;
    expect(calculateBaseScore(shape)).toBe(9);
  });

  it('should calculate line score correctly with combo', () => {
    expect(calculateLineScore(2, 2)).toBe(40); // (10 * 2) * 2
    expect(calculateLineScore(1, 0)).toBe(10); // (10 * 1) * 1
  });
});
