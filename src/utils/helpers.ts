export interface Cell {
  occupied: boolean;
  dividing: boolean;
}

/**
 * @param grid - The current state of the grid where each cell is either occupied or not, and dividing or not.
 * @returns A new grid with updated cell states after one growth step.
 */
export const simulateGrowth = (grid: Cell[][]): Cell[][] => {
  const newGrid = grid.map(row => row.map(cell => ({ ...cell })));

  // Iterate over each cell in the grid
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      // Process cells that are occupied and not dividing
      if (grid[row][col].occupied && !grid[row][col].dividing) {
        newGrid[row][col].dividing = true; 

        // Define the directions for adjacent and diagonal cells
        const directions = [
          [0, 1], [1, 0], [0, -1], [-1, 0], // Four cardinal directions: right, down, left, up
          [1, 1], [1, -1], [-1, 1], [-1, -1] // Four diagonal directions
        ];

        // Attempt to divide into adjacent and diagonal cells
        directions.forEach(([dx, dy]) => {
          const newRow = row + dx;
          const newCol = col + dy;

          // Ensure the new cell is within grid bounds
          if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[row].length) {
            // If the new cell is not occupied or dividing, mark it as occupied
            if (!grid[newRow][newCol].occupied && !grid[newRow][newCol].dividing) {
              newGrid[newRow][newCol].occupied = true;
            }
          }
        });
      } 
      // Process cells that are currently dividing
      else if (grid[row][col].dividing) {
        newGrid[row][col].dividing = false; 
      }
    }
  }

  return newGrid;
};
