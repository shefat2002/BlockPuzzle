import { useEffect, useRef } from 'react';
import { GridComponent } from './components/Grid';
import { BlockSelector } from './components/BlockSelector';
import { ScoreBoard } from './components/ScoreBoard';
import { GameOverModal } from './components/GameOverModal';
import { Footer } from './components/Footer';
import { useDragStore } from './store/useDragStore';
import { useGameStore } from './store/useGameStore';

function App() {
  const isDragging = useDragStore((state) => state.isDragging);
  const draggedBlock = useDragStore((state) => state.draggedBlock);
  const draggedIndex = useDragStore((state) => state.draggedIndex);
  const dragPos = useDragStore((state) => state.dragPos);
  const updateDrag = useDragStore((state) => state.updateDrag);
  const endDrag = useDragStore((state) => state.endDrag);
  const hoverPos = useDragStore((state) => state.hoverPos);
  const setHoverPos = useDragStore((state) => state.setHoverPos);
  
  const attemptPlaceBlock = useGameStore((state) => state.attemptPlaceBlock);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging && draggedBlock) {
        updateDrag(e);

        // Rendered cell size is 35px in the floating block. 
        // Block is shifted ABOVE the finger to not be hidden by it.
        const cellVisualSize = 35;
        const blockHeight = draggedBlock.shape.length * cellVisualSize;
        const yOffset = -40; // Same as marginTop in rendering
        
        // Find visual center of the floating block
        const visualCenterX = e.clientX;
        const visualCenterY = e.clientY + yOffset - (blockHeight / 2);

        // Calculate hover based on DOM elements under the visual center of the block
        const elements = document.elementsFromPoint(visualCenterX, visualCenterY);
        const cell = elements.find(el => el.hasAttribute('data-row') && el.hasAttribute('data-col'));
        
        if (cell) {
          const centerRow = parseInt(cell.getAttribute('data-row') || '-1', 10);
          const centerCol = parseInt(cell.getAttribute('data-col') || '-1', 10);
          
          if (centerRow !== -1 && centerCol !== -1) {
            // Offset back to top-left cell based on the block's dimensions
            const hoverRow = centerRow - Math.floor(draggedBlock.shape.length / 2);
            const hoverCol = centerCol - Math.floor(draggedBlock.shape[0].length / 2);
            setHoverPos({ row: hoverRow, col: hoverCol });
          }
        } else {
          setHoverPos(null);
        }
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (isDragging && draggedIndex !== null && hoverPos) {
        attemptPlaceBlock(draggedIndex, hoverPos.row, hoverPos.col, e.clientX, e.clientY);
      }
      endDrag();
    };

    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, draggedBlock, draggedIndex, hoverPos, attemptPlaceBlock, updateDrag, setHoverPos, endDrag]);

  const floatingTexts = useGameStore(state => state.floatingTexts);
  const removeFloatingText = useGameStore(state => state.removeFloatingText);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-12 touch-none select-none overflow-hidden"
    >
      <ScoreBoard />
      <GridComponent />
      <BlockSelector />
      <GameOverModal />
      <Footer />

      {/* Floating Dragged Block */}
      {isDragging && draggedBlock && (
        <div
          className="fixed pointer-events-none z-50 drop-shadow-2xl opacity-90"
          style={{
            left: dragPos.x,
            top: dragPos.y,
            transform: 'translate(-50%, -50%) scale(1.1)', // Center on pointer
            display: 'grid',
            gridTemplateColumns: `repeat(${draggedBlock.shape[0].length}, 1fr)`,
            gridTemplateRows: `repeat(${draggedBlock.shape.length}, 1fr)`,
            gap: '2px',
            width: `${draggedBlock.shape[0].length * 30}px`,
            height: `${draggedBlock.shape.length * 30}px`,
          }}
        >
          {draggedBlock.shape.map((row, r) =>
            row.map((cell, c) => (
              <div
                key={`${r}-${c}`}
                className={`w-full h-full rounded-sm ${cell === 1 ? 'bg-purple-500 shadow-inner' : 'bg-transparent'}`}
              />
            ))
          )}
        </div>
      )}

      {/* Floating Texts */}
      {floatingTexts.map(ft => (
        <div
          key={ft.id}
          className="fixed pointer-events-none z-[60] text-xl font-black text-white text-shadow-md animate-[floatUp_1s_ease-out_forwards]"
          style={{ left: ft.x, top: ft.y, transform: 'translate(-50%, -50%)' }}
          onAnimationEnd={() => removeFloatingText(ft.id)}
        >
          {ft.text}
        </div>
      ))}
    </div>
  );
}

export default App;
