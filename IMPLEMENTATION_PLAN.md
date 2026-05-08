# Block Puzzle Implementation Plan

## Objective
To build a fully functional, mobile-responsive Block Puzzle game utilizing a pure TypeScript logic engine and a React/Vite/Tailwind frontend. The architecture will strictly decouple game logic from UI rendering, adhering to the multi-agent system guidelines.

## Tech Stack
*   **Core Logic:** Pure TypeScript
*   **Frontend Framework:** React 18
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **State Management:** Zustand (lightweight, unopinionated, great for game state)
*   **Animations:** Framer Motion (for UI juice, floating text) + CSS Transforms (for performance)

---

## Phased Implementation Checklist

### Phase 1: Project Setup & Architecture (Senior System Architect)
- [ ] Initialize Vite project with React and TypeScript (`npm create vite@latest . -- --template react-ts`).
- [ ] Install dependencies: Tailwind CSS, Zustand, Framer Motion, and testing tools (Vitest).
- [ ] Configure Tailwind CSS.
- [ ] Establish directory structure:
    - `/src/engine` (Pure TypeScript game logic)
    - `/src/store` (Zustand state management)
    - `/src/components` (React UI components)
    - `/src/hooks` (Custom React hooks for game interactions)
    - `/src/types` (Global TypeScript definitions)

### Phase 2: Core Game Logic Engine (Rules Specialist)
*Note: This phase must have zero UI dependencies.*
- [ ] Define shapes and block dictionary in `/src/engine/blocks.ts`.
- [ ] Implement `GameBoard` class (from provided TS code) in `/src/engine/GameBoard.ts`:
    - [ ] 8x8 matrix initialization.
    - [ ] `canPlace` collision detection logic.
    - [ ] `placeBlock` matrix manipulation logic.
    - [ ] `clearLines` identification and clearing logic.
    - [ ] `checkGameOver` condition logic.
- [ ] Implement scoring mathematical formulas based on cleared lines and combos.
- [ ] Write unit tests (Vitest) to verify all pure logic functions.

### Phase 3: State Management Integration (System Architect)
- [ ] Create a Zustand store (`/src/store/useGameStore.ts`) to manage:
    - `grid`: The current 8x8 matrix state.
    - `score`: Current game score.
    - `combo`: Current combo multiplier.
    - `availableBlocks`: The 3 blocks currently available to the player.
    - `isGameOver`: Boolean flag.
- [ ] Define actions in the store to bridge UI and Engine (e.g., `attemptPlaceBlock(shape, row, col)`, `resetGame()`).
- [ ] Ensure the store handles immutable updates of the grid to trigger React re-renders correctly.

### Phase 4: UI Implementation & Drag-and-Drop (Web Developer)
- [ ] Create the main layout container (responsive, mobile-first) using Tailwind.
- [ ] Implement the `Grid` component to render the 8x8 board.
- [ ] Implement the `BlockSelector` component to display the 3 available blocks.
- [ ] Implement robust Drag-and-Drop functionality using Pointer Events:
    - [ ] Draggable block components.
    - [ ] Drop zones on the grid.
    - [ ] Visual indicator/shadow on the grid showing where the block will land during drag.
- [ ] Implement Scoreboard and "Game Over" modal.

### Phase 5: Game Loop & "Juice" (Game Developer)
- [ ] Add visual feedback for block pickup and placement.
- [ ] Implement line-clear animations (e.g., blocks glowing/shattering before disappearing).
- [ ] Add floating score text animations ("+10", "Combo x2") using Framer Motion when lines are cleared.
- [ ] *Optional:* Integrate simple sound effects for placement, clearing, and game over.

### Phase 6: Final Review & Optimization
- [ ] Audit performance: Ensure dragging blocks does not cause unnecessary re-renders of the entire grid.
- [ ] Cross-device testing (desktop mouse vs. mobile touch).
- [ ] Final polishing of timings and animations.

## Verification & Rollback
*   **Verification:** Each phase is verified independently. Pure logic is tested via Vitest. UI features are tested in the browser. The final game loop must be playable end-to-end without console errors.
*   **Rollback:** If state management becomes a bottleneck, we can pivot from Zustand to React's native `useReducer` or a custom pub/sub class without rewriting the pure TS engine.