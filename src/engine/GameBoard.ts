import type { BlockShape } from './blocks';

export type Grid = number[][];

export class GameBoard {
  static createEmptyGrid(): Grid {
    return Array.from({ length: 8 }, () => Array(8).fill(0));
  }

  static canPlace(grid: Grid, shape: BlockShape, startRow: number, startCol: number): boolean {
    const shapeRows = shape.length;
    const shapeCols = shape[0].length;

    for (let r = 0; r < shapeRows; r++) {
      for (let c = 0; c < shapeCols; c++) {
        if (shape[r][c] !== 0) {
          const boardRow = startRow + r;
          const boardCol = startCol + c;

          if (boardRow < 0 || boardRow >= 8 || boardCol < 0 || boardCol >= 8) {
            return false;
          }

          if (grid[boardRow][boardCol] !== 0) {
            return false;
          }
        }
      }
    }
    return true;
  }

  static placeBlock(grid: Grid, shape: BlockShape, startRow: number, startCol: number): Grid {
    // Assumes canPlace has already been validated
    const newGrid = grid.map(row => [...row]);
    
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[0].length; c++) {
        if (shape[r][c] !== 0) {
          newGrid[startRow + r][startCol + c] = 1;
        }
      }
    }
    return newGrid;
  }

  static clearLines(grid: Grid): { newGrid: Grid, linesCleared: number } {
    const rowsToClear = new Set<number>();
    const colsToClear = new Set<number>();

    // Check rows
    for (let r = 0; r < 8; r++) {
      if (grid[r].every(cell => cell !== 0)) {
        rowsToClear.add(r);
      }
    }

    // Check cols
    for (let c = 0; c < 8; c++) {
      let full = true;
      for (let r = 0; r < 8; r++) {
        if (grid[r][c] === 0) {
          full = false;
          break;
        }
      }
      if (full) {
        colsToClear.add(c);
      }
    }

    let linesCleared = rowsToClear.size + colsToClear.size;
    
    if (linesCleared === 0) {
      return { newGrid: grid, linesCleared: 0 };
    }

    const newGrid = grid.map((row, r) => 
      row.map((cell, c) => {
        if (rowsToClear.has(r) || colsToClear.has(c)) {
          return 0;
        }
        return cell;
      })
    );

    return { newGrid, linesCleared };
  }

  static checkGameOver(grid: Grid, availableShapes: BlockShape[]): boolean {
    if (availableShapes.length === 0) return false;

    for (const shape of availableShapes) {
      let canPlaceShape = false;
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          if (this.canPlace(grid, shape, r, c)) {
            canPlaceShape = true;
            break;
          }
        }
        if (canPlaceShape) break;
      }
      
      // If any of the available blocks can be placed, it's not game over.
      if (canPlaceShape) return false;
    }
    
    // If none of the available blocks can be placed, game over.
    return true;
  }
}
