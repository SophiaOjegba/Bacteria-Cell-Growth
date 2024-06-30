import React, { useState, useEffect } from 'react';
import { Cell } from '../utils/helpers';

interface GridProps {
  grid: Cell[][];
  toggleCell: (row: number, col: number) => void;
}

const Grid: React.FC<GridProps> = ({ grid, toggleCell }) => {
  // State to keep track of the currently selected cell
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);

  useEffect(() => {
    // Handle keyboard navigation and cell toggle
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!selectedCell) return;

      let newRow = selectedCell.row;
      let newCol = selectedCell.col;

      switch (event.key) {
        case 'w': // Move up
          newRow = Math.max(0, selectedCell.row - 1);
          break;
        case 'a': // Move left
          newCol = Math.max(0, selectedCell.col - 1);
          break;
        case 's': // Move down
          newRow = Math.min(grid.length - 1, selectedCell.row + 1);
          break;
        case 'd': // Move right
          newCol = Math.min(grid[0].length - 1, selectedCell.col + 1);
          break;
        case 'Enter': // Toggle cell
          toggleCell(selectedCell.row, selectedCell.col);
          return;
        default:
          return; // Ignore other keys
      }

      setSelectedCell({ row: newRow, col: newCol });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [grid, selectedCell, toggleCell]);

  // Handle cell click to select and toggle the cell
  const handleCellClick = (row: number, col: number) => {
 
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
      console.error("Invalid cell coordinates:", { row, col });
      return;
    }
    setSelectedCell({ row, col });
    toggleCell(row, col);
  };

  return (
    <div className="grid" style={{ gridTemplateColumns: `repeat(${grid[0].length}, 1fr)` }}>
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            role="gridcell"
            aria-label={`Cell ${rowIndex}, ${colIndex} ${cell.occupied ? 'occupied' : 'empty'}`}
            onClick={() => handleCellClick(rowIndex, colIndex)}
            className={`cell ${cell.occupied ? 'occupied' : ''} ${selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex ? 'selected' : ''}`}
            tabIndex={0} 
          />
        ))
      )}
    </div>
  );
};

export default Grid;
