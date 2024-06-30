import { useState, useEffect, useRef } from 'react';
import { simulateGrowth } from '../utils/helpers'; 

interface UseSimulationProps {
  running: boolean;
  paused: boolean;
  interval: number;
  grid: any[];
  setGrid: (grid: any[]) => void;
  isFullyOccupied: () => boolean;
  setRunning: (running: boolean) => void;
  setPaused: (paused: boolean) => void;
}

/**
 * Custom hook to manage the simulation of bacterial cell growth.
 * Handles the simulation loop, updates the grid, tracks growth rate, and manages the simulation state.
 *
 * @param props - Configuration and state setters for the simulation.
 * @returns An object containing growth rate data, final cell count, simulation status, and a function to clear simulation data.
 */
const useSimulation = ({
  running,
  paused,
  interval,
  grid,
  setGrid,
  isFullyOccupied,
  setRunning,
  setPaused
}: UseSimulationProps) => {
  const [growthRate, setGrowthRate] = useState<{ time: number; count: number }[]>([]);
  const [finalCellCount, setFinalCellCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    // Start the simulation if running and not paused
    if (running && !paused) {
      timer = setInterval(() => {
        // Check if the grid is fully occupied
        if (isFullyOccupied()) {
          setRunning(false);
          setPaused(false);
          setIsFinished(true);
          setFinalCellCount(grid.flat().filter(cell => cell.occupied).length);
          if (timer) clearInterval(timer);
          return;
        }

        // Update the grid and growth rate
        try {
          const newGrid = simulateGrowth(grid);
          setGrid(newGrid);
          setGrowthRate(prevRate => [
            ...prevRate,
            { time: timeRef.current, count: newGrid.flat().filter(cell => cell.occupied).length }
          ]);
          timeRef.current += interval;
        } catch (error) {
          console.error('Error simulating growth:', error);
          setRunning(false);
          setPaused(false);
          setIsFinished(true);
          if (timer) clearInterval(timer);
        }
      }, interval);

      // Clean up the interval on component unmount or when dependencies change
      return () => {
        if (timer) clearInterval(timer);
      };
    }
  }, [running, paused, interval, grid, setGrid, isFullyOccupied, setRunning, setPaused]);

  /**
   * Resets the simulation data.
   * Clears the growth rate, final cell count, and simulation status, and resets the time reference.
   */
  const clearSimulationData = () => {
    setGrowthRate([]);
    setFinalCellCount(0);
    setIsFinished(false);
    timeRef.current = 0;
  };

  return { growthRate, finalCellCount, isFinished, clearSimulationData };
};

export default useSimulation;
