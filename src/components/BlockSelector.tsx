import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { useDragStore } from '../store/useDragStore';
import type { Block } from '../engine/blocks';

export const BlockSelector: React.FC = () => {
  const availableBlocks = useGameStore((state) => state.availableBlocks);

  return (
    <div className="flex justify-center gap-4 mt-8 h-32">
      {availableBlocks.map((block, index) => (
        <div key={index} className="w-24 h-24 flex items-center justify-center">
          {block && <DraggableBlock block={block} index={index} />}
        </div>
      ))}
    </div>
  );
};

const DraggableBlock: React.FC<{ block: Block; index: number }> = ({ block, index }) => {
  const startDrag = useDragStore((state) => state.startDrag);
  const isDragging = useDragStore((state) => state.isDragging);
  const draggedIndex = useDragStore((state) => state.draggedIndex);

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    startDrag(block, index, e);
  };

  // Hide the original block while dragging it
  if (isDragging && draggedIndex === index) {
    return <div className="opacity-0" />;
  }

  const rows = block.shape.length;
  const cols = block.shape[0].length;

  return (
    <div
      onPointerDown={onPointerDown}
      className="cursor-grab touch-none select-none drop-shadow-md"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: '2px',
        width: `${cols * 20}px`,
        height: `${rows * 20}px`,
      }}
    >
      {block.shape.map((row, r) =>
        row.map((cell, c) => (
          <div
            key={`${r}-${c}`}
            className={`w-full h-full rounded-[2px] ${cell === 1 ? 'bg-purple-500' : 'bg-transparent'}`}
          />
        ))
      )}
    </div>
  );
};
