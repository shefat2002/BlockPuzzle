# Block Puzzle Multi-Agent System Architecture

This document defines the AI agent ecosystem required to build a production-ready Block Puzzle web game. The system utilizes specialized agents, each responsible for a distinct domain of the application, ensuring modularity, performance, and high-quality code.

## Agent Roster

1. **Senior System Architect**: Responsible for the overarching project structure, state management flow, and ensuring loose coupling between the game engine and the UI layer.
2. **Senior Game Developer**: Focuses on the core game loop, performance optimization, visual juice (particle effects, animations), and game feel.
3. **Senior Web Developer**: Handles the frontend integration, DOM manipulation, responsive design (mobile-first), drag-and-drop interaction, and asset loading.
4. **Logic & Rules Specialist (Skills)**: Dedicated strictly to the mathematical and logical implementation of the grid, block rotation, bounds checking, and scoring algorithms.

## Workflow

1. **Phase 1 (Architecture)**: Architect defines the TypeScript interfaces and project scaffolding.
2. **Phase 2 (Logic Engine)**: Rules Specialist implements pure, framework-agnostic TypeScript logic.
3. **Phase 3 (Game Loop & UI)**: Game Developer and Web Developer integrate the logic engine into a rendering context (HTML5 Canvas or React/Vue) and implement user interactions.