import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { useDragStore } from '../store/useDragStore';
import { GameBoard } from '../engine/GameBoard';

export const GridComponent: React.FC = () => {
  const grid = useGameStore((state) => state.grid);
  const hoverPos = useDragStore((state) => state.hoverPos);
  const draggedBlock = useDragStore((state) => state.draggedBlock);

  // Check if current drag placement is valid
  let canPlacePreview = false;
  if (hoverPos && draggedBlock) {
    canPlacePreview = GameBoard.canPlace(grid, draggedBlock.shape, hoverPos.row, hoverPos.col);
  }

  return (
    <div 
      className="grid grid-cols-8 gap-1 bg-gray-800 p-2 rounded-xl shadow-xl w-full max-w-[400px] aspect-square select-none touch-none"
    >
      {grid.map((row, r) =>
        row.map((cell, c) => {
          let isPreview = false;
          let isPreviewValid = false;

          if (hoverPos && draggedBlock) {
            const rowOffset = r - hoverPos.row;
            const colOffset = c - hoverPos.col;
            if (
              rowOffset >= 0 && rowOffset < draggedBlock.shape.length &&
              colOffset >= 0 && colOffset < draggedBlock.shape[0].length
            ) {
              if (draggedBlock.shape[rowOffset][colOffset] !== 0) {
                isPreview = true;
                isPreviewValid = canPlacePreview;
              }
            }
          }

          return (
            <div
              key={`${r}-${c}`}
              data-row={r}
              data-col={c}
              className={`rounded-sm transition-colors duration-150
                ${cell === 1 ? 'bg-purple-500 shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]' : 'bg-gray-700'}
                ${isPreview && isPreviewValid ? 'bg-purple-400 opacity-70' : ''}
                ${isPreview && !isPreviewValid ? 'bg-red-500 opacity-70' : ''}
              `}
            />
          );
        })
      )}
    </div>
  );
};
