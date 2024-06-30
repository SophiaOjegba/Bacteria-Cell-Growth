import React from 'react';

interface GrowthChartProps {
  growthRate: { time: number; count: number }[];
  finalCellCount: number;
  isFinished: boolean;
}

const GrowthChart: React.FC<GrowthChartProps> = ({ growthRate, finalCellCount, isFinished }) => {
  const chartWidth = 600;
  const chartHeight = 300;
  const padding = 50;
  const chartInnerWidth = chartWidth - padding * 2;
  const chartInnerHeight = chartHeight - padding * 2;

  const adjustedGrowthRate = [{ time: 0, count: 0 }, ...growthRate];
  
  const maxYValue = Math.max(...adjustedGrowthRate.map(data => data.count), 10);
  const maxXValue = Math.max(...adjustedGrowthRate.map(data => data.time), 10);

  // Map data points to SVG coordinates
  const dataPoints = adjustedGrowthRate.map((data) => ({
    x: (data.time / maxXValue) * chartInnerWidth + padding,
    y: (1 - data.count / maxYValue) * chartInnerHeight + padding,
  }));

  // data for the line graph
  const pathData = dataPoints.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x},${point.y}`).join(' ');

  return (
    <div style={{ 
      margin: '20px', 
      padding: '20px', 
      border: '1px solid var(--cell-border)', 
      borderRadius: '8px', 
      background: 'var(--chart-bg)', 
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
    }}>
      <svg width={chartWidth} height={chartHeight} style={{ border: '1px solid var(--cell-border)', borderRadius: '8px', overflow: 'visible' }}>
        <rect x={padding - 10} y={padding - 10} width={chartInnerWidth + 20} height={chartInnerHeight + 20} fill="none" stroke="var(--cell-border)" strokeWidth="1" />
  
        <path d={pathData} fill="none" stroke="var(--path-stroke)" strokeWidth="2" />
        {/* Plot data points and labels */}
        {dataPoints.map((point, index) => (
          <g key={index}>
            <circle cx={point.x} cy={point.y} r={4} fill="var(--circle-fill)" stroke="var(--circle-stroke)" strokeWidth="2" />
            <text x={point.x} y={point.y - 10} fontSize="10" textAnchor="middle" fill="var(--text-color-chart)">
              {adjustedGrowthRate[index].count}
            </text>
          </g>
        ))}
        {/* X and Y axis labels */}
        <text x={chartWidth / 2} y={chartHeight - 10} textAnchor="middle" fill="var(--text-color-chart)" fontSize="12" fontWeight="bold">Time (s)</text>
        <text x={-chartHeight / 2} y={15} transform="rotate(-90)" textAnchor="middle" fill="var(--text-color-chart)" fontSize="12" fontWeight="bold">Number of Cells</text>
      </svg>
      {/* Display growth summary */}
      <div className='growthChart' style={{ marginTop: '20px', fontFamily: 'Arial, sans-serif', color: 'var(--text-color-chart)' }}>
        <h2 style={{ color: 'var(--path-stroke)' }}>Growth Summary</h2>
        <p>Total Number of Cells: {finalCellCount}</p>
        <p>Status: {isFinished ? 'Simulation Completed' : 'Simulation Ongoing'}</p>
      </div>
    </div>
  );
};

export default GrowthChart;