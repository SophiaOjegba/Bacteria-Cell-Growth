import React from 'react';

interface GrowthChartProps {
  growthRate: number[];
}

const GrowthChart: React.FC<GrowthChartProps> = ({ growthRate }) => {
  const chartWidth = 300;
  const chartHeight = 200;
  const maxYValue = Math.max(...growthRate, 10);
  const dataPoints = growthRate.map((value: number, index: number) => ({
    x: (index / (growthRate.length - 1)) * chartWidth,
    y: (1 - value / maxYValue) * chartHeight,
  }));

  const pathData = dataPoints.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x},${point.y}`).join(' ');

  return (
    <svg width={chartWidth} height={chartHeight} style={{ border: '5px solid black' }}>
      <path d={pathData} fill="none" stroke="blue" strokeWidth="2" />
      <text x="10" y="10" fill="black">Growth Rate</text>
      <text x={chartWidth - 50} y={chartHeight - 10} fill="black">Time</text>
    </svg>
  );
};

export default GrowthChart;
