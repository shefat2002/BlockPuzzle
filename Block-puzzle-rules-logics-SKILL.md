# Skill: Block Puzzle Rules & Logics

## Objective
Define the strict game loop rules, scoring mathematics, and win/loss conditions based on the standard "Block Blast" genre.

## Game Rules
1.  **Grid**: 8x8 squares.
2.  **Spawning**: The player is presented with 3 random blocks at a time. All 3 must be placed before a new set of 3 is generated.
3.  **Placement**: Blocks cannot overlap or extend past the grid boundaries.
4.  **Clearing**: If a row or column becomes entirely filled, it is immediately cleared.
5.  **Simultaneous Clears**: Placing a block can clear multiple rows and columns simultaneously. 

## Scoring Mathematics
* **Base Score**: Placing a block awards points equal to the number of squares in the block (e.g., placing a 3x3 square = 9 points).
* **Line Clear**: Clearing a line awards points (e.g., 10 points per line).
* **Combo System**: 
    * Clearing lines in consecutive turns builds a combo multiplier.
    * Clearing multiple lines with a single block grants an immediate multiplier based on the number of lines cleared.
    * *Formula example*: `(Base Line Score * Number of Lines) * Combo Multiplier`.

## End Game Condition
* **Game Over Check**: After every block placement, the engine must iterate through the *remaining* blocks in the player's current set of 3. If none of the remaining blocks can fit anywhere on the current grid, the game is over.