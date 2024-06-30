import { useState } from 'react';
import { Cell } from '../utils/helpers';

/**
 * Custom hook for managing the state and operations of a grid used in the simulation.
 * Provides functionality to create, resize, reset, and manipulate the grid.
 *
 * @param initialGridSize - The initial size of the grid.
 * @returns An object containing grid state, setters, and grid operations.
 */
const useGrid = (initialGridSize: number) => {
  // Creates a grid with the specified size, initializing all cells as not occupied and not dividing.
  const createInitialGrid = (size: number): Cell[][] =>
    Array.from({ length: size }, () =>
      Array.from({ length: size }, () => ({ occupied: false, dividing: false }))
    );

  const [gridSize, setGridSize] = useState<number>(initialGridSize);
  const [grid, setGrid] = useState<Cell[][]>(createInitialGrid(initialGridSize));

  /**
   * Resizes the grid to a new size. Retains existing cells if the new size is larger.
   *
   * @param newSize - The new size for the grid.
   */
  const resizeGrid = (newSize: number) => {
    const newGrid = createInitialGrid(newSize);

    // Copy existing cells to the new grid, if applicable
    for (let i = 0; i < Math.min(gridSize, newSize); i++) {
      for (let j = 0; j < Math.min(gridSize, newSize); j++) {
        newGrid[i][j] = { ...grid[i][j] };
      }
    }

    setGrid(newGrid);
    setGridSize(newSize);
  };

  /**
   * Resets the grid to its initial state with the given size.
   * Defaults to the current grid size if no size is provided.
   *
   * @param size - The size to reset the grid to. Defaults to the current grid size.
   */
  const resetGrid = (size: number = gridSize) => {
    setGridSize(size);
    const newGrid = createInitialGrid(size);
    setGrid(newGrid);
  };

  /**
   * Toggles the occupied state of a specific cell in the grid.
   *
   * @param row - The row index of the cell to toggle.
   * @param col - The column index of the cell to toggle.
   */
  const toggleCell = (row: number, col: number) => {
    const newGrid = grid.map((r, i) =>
      r.map((cell, j) => (i === row && j === col ? { ...cell, occupied: !cell.occupied } : cell))
    );
    setGrid(newGrid);
  };

  /**
   * Checks if the grid is fully occupied.
   *
   * @returns True if all cells are occupied, otherwise false.
   */
  const isFullyOccupied = () => {
    const totalCells = gridSize * gridSize;
    const occupiedCells = grid.flat().filter(cell => cell.occupied).length;
    return occupiedCells >= totalCells;
  };

  return { grid, setGrid, gridSize, setGridSize, resetGrid, toggleCell, isFullyOccupied, resizeGrid };
};

export default useGrid;
