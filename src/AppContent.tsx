import React, { useState, useEffect } from "react";
import Controls from "./components/Controls";
import Grid from "./components/Grid";
import GrowthDisplay from "./components/GrowthDisplay";
import useSimulation from "./hooks/useSimulation";
import ThemeSwitcher from "./components/ThemeSwitcher";
import useGrid from "./hooks/useGrid";
import "./index.css";
import { useNavigate } from "react-router-dom";

const AppContent: React.FC = () => {
  const initialGridSize = 10;

  // Hook for managing grid state and operations
  const {
    grid,
    setGrid,
    gridSize,
    setGridSize,
    toggleCell,
    resetGrid,
    resizeGrid,
  } = useGrid(initialGridSize);

  // State variables for simulation control
  const [running, setRunning] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const [interval, setInterval] = useState<number>(1000);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Hook for navigation
  const navigate = useNavigate();

  // Update document theme based on state
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Hook for managing simulation logic
  const { growthRate, finalCellCount, isFinished, clearSimulationData } =
    useSimulation({
      running,
      paused,
      interval,
      grid,
      setGrid,
      isFullyOccupied: () => grid.flat().every((cell) => cell.occupied),
      setRunning,
      setPaused,
    });

  // Navigate to the home page
  const handleProceed = () => {
    navigate("/");
  };

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Start or stop the simulation
  const toggleRunning = () => {
    if (!running) {
      // Ensure at least one cell is occupied at simulation start
      if (grid.flat().every((cell) => !cell.occupied)) {
        const middleRow = Math.floor(grid.length / 2);
        const middleCol = Math.floor(grid[0].length / 2);
        const newGrid = grid.map((row, rowIndex) =>
          row.map((cell, colIndex) =>
            rowIndex === middleRow && colIndex === middleCol
              ? { ...cell, occupied: true }
              : cell
          )
        );
        setGrid(newGrid);
      }
      setPaused(false);
      setRunning(true);
    } else {
      setRunning(false);
    }
  };

  // Reset the simulation state and grid
  const handleReset = () => {
    setRunning(false);
    setPaused(false);
    setInterval(1000);
    resetGrid(gridSize);
    clearSimulationData();
  };

  return (
    <div className="app">
      <header className="header">
        <button className="Home" onClick={handleProceed}>
          Home
        </button>
        <h1 className="appHeader">Bacterial Cell Growth Simulation</h1>
        <ThemeSwitcher toggleTheme={toggleTheme} theme={theme} />
      </header>
      <Controls
        interval={interval}
        setInterval={setInterval}
        running={running}
        toggleRunning={toggleRunning}
        resetGrid={handleReset}
        setGridSize={(size) => {
          if (size > 0) {
            setGridSize(size);
            resizeGrid(size);
          }
        }}
        gridSize={gridSize}
        isPaused={paused}
        resumeSimulation={() => setRunning(true)}
      />
      <div className="main-content">
        <div className="grid-container">
          <Grid grid={grid} toggleCell={toggleCell} />
        </div>
        <div className="chart-container">
          <GrowthDisplay
            growthRate={growthRate}
            finalCellCount={finalCellCount}
            isFinished={isFinished}
          />
        </div>
      </div>
    </div>
  );
};

export default AppContent;
