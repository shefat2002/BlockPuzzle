# Skill: Block Puzzle Core Implementation

## Objective
Provide the low-level, pure TypeScript implementation of the game grid, block definitions, and placement mechanics.

## Core Responsibilities
* **Grid Definition**: Implement an 8x8 matrix to represent the game board.
* **Block Dictionary**: Create a predefined set of tetrominoes and pentominoes (e.g., L-shapes, T-shapes, 1x1, 2x2, 3x3 squares, 1x5 lines).
* **Collision Detection**: Write functions to verify if a block intersects with existing grid items or goes out of bounds.
* **Matrix Manipulation**: Handle 2D array transformations for placing blocks and zeroing out cleared lines.

## Technical Constraints
* **No UI Dependencies**: This code must be completely agnostic of the DOM, Canvas, or any frontend framework.
* **Immutability (Optional but preferred)**: When returning state changes, prefer returning new grid copies to support modern reactive UI frameworks, or clearly document mutation methods.