import React from 'react';

interface ControlsProps {
  interval: number;
  setInterval: (interval: number) => void;
  running: boolean;
  toggleRunning: () => void;
  resetGrid: () => void;
  setGridSize: (size: number) => void;
  gridSize: number;
  isPaused: boolean;
  resumeSimulation: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  interval,
  setInterval,
  running,
  toggleRunning,
  resetGrid,
  setGridSize,
  gridSize,
  isPaused,
}) => {
  // Handle grid size change from dropdown
  const handleGridSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const size = parseInt(event.target.value, 10);

    if (isNaN(size) || size <= 0) {
      console.error("Invalid grid size selected:", event.target.value);
      return; 
    }

    setGridSize(size); 
  };

  // Handle interval change from input
  const handleIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInterval = parseInt(event.target.value, 10);

    if (isNaN(newInterval) || newInterval <= 0) {
      console.error("Invalid interval value:", event.target.value);
      return; 
    }

    setInterval(newInterval); 
  };

  return (
    <div className="controls">
      <button onClick={toggleRunning}>
        {running ? (isPaused ? 'Resume' : 'Pause') : 'Start'}
      </button>
      <button onClick={resetGrid}>Reset</button>
      
      <label htmlFor="interval">Interval (ms):</label>
      <input
        id="interval"
        type="number"
        value={interval}
        onChange={handleIntervalChange}
        disabled={running && !isPaused} 
        min="100" 
      />
      
      <label htmlFor="gridSize">Grid Size:</label>
      <select id="gridSize" value={gridSize} onChange={handleGridSizeChange}>
        <option value="10">10x10</option>
        <option value="15">15x15</option>
        <option value="20">20x20</option>
      </select>
    </div>
  );
};

export default Controls;
