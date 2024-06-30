import React from 'react';
import GrowthChart from './GrowthChart';

interface GrowthDisplayProps {
  growthRate: { time: number; count: number }[];
  finalCellCount: number;
  isFinished: boolean;
}

const GrowthDisplay: React.FC<GrowthDisplayProps> = ({ growthRate, finalCellCount, isFinished }) => {
  return (
    <div className="chart-container">
      <GrowthChart 
        growthRate={growthRate} 
        finalCellCount={finalCellCount} 
        isFinished={isFinished}
      />
    </div>
  );
};

export default GrowthDisplay;
