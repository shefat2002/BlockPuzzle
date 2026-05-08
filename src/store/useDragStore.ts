import { create } from 'zustand';
import type { Block } from '../engine/blocks';

interface DragState {
  isDragging: boolean;
  draggedBlock: Block | null;
  draggedIndex: number | null;
  dragPos: { x: number; y: number };
  hoverPos: { row: number; col: number } | null;
  startDrag: (block: Block, index: number, e: React.PointerEvent) => void;
  updateDrag: (e: React.PointerEvent | PointerEvent) => void;
  setHoverPos: (pos: { row: number; col: number } | null) => void;
  endDrag: () => void;
}

export const useDragStore = create<DragState>((set, get) => ({
  isDragging: false,
  draggedBlock: null,
  draggedIndex: null,
  dragPos: { x: 0, y: 0 },
  hoverPos: null,

  startDrag: (block, index, e) => {
    set({
      isDragging: true,
      draggedBlock: block,
      draggedIndex: index,
      dragPos: { x: e.clientX, y: e.clientY },
      hoverPos: null,
    });
  },

  updateDrag: (e) => {
    if (!get().isDragging) return;
    set({ dragPos: { x: e.clientX, y: e.clientY } });
  },

  setHoverPos: (pos) => {
    set({ hoverPos: pos });
  },

  endDrag: () => {
    set({
      isDragging: false,
      draggedBlock: null,
      draggedIndex: null,
      hoverPos: null,
    });
  },
}));
