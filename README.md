# Bacterial Cell Growth Simulation

## Overview

This project is a bacterial cell growth simulation built using React and TypeScript. The application demonstrates how bacterial cells divide and spread within a confined space, such as a petri dish. It provides an interactive interface for users to start, pause, reset the simulation, adjust the interval for cell division, and visualize the growth of the bacterial colony over time.

## Features

- **Grid Representation:** 
  - Displays a grid representing a petri dish (e.g., 20x20 cells), where each cell can be empty or occupied by a bacterial cell.
  
- **Growth Simulation:**
  - Cells divide every fixed time interval (e.g., every 1 second).
  - Cells can only divide if there is at least one adjacent empty cell (up, down, left, right).
  
- **User Controls:**
  - A button to start or pause the simulation.
  - A button to reset the simulation.
  - An input field to set the time interval for cell division.
  - Dropdown to adjust the grid size (e.g., 10x10, 15x15, 20x20).
  - Ability to manually place or remove bacterial cells on the grid by clicking on the cells.
  - Ability to use keyboard navigation (W,A,S,D) for control.
  - Ability to dymanically change grid during simulation.

- **Chart Visualization:**
  - Displays growth rate and final cell count using a line chart.
  
- **Theme Switcher:**
  - Allows toggling between light and dark themes.

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation

1. **Clone the repository:**

   ```bash
   git clone git@github.com:SophiaOjegba/Bacteria-Cell-Growth.git
2. **Navigate to the project directory:**
    ```bash
    cd Bacteria-Cell-Growth
3. **Install dependencies:**
    ```bash
    npm install
    ```

### Installation

  **Install dependencies:**
  ```bash
  npm start
  ```

## Performance Analysis

### Rendering Performance

The application leverages React's virtual DOM for efficient rendering. Components such as the grid, controls, and charts are optimized for performance to ensure smooth user interaction even with dynamic updates.

### Grid Operations

- **Grid Size:** The application supports grid sizes up to 20x20 cells. Rendering and updating larger grids may impact performance, especially on lower-end devices or browsers with limited memory.

- **Cell Manipulation:** Clicking to place or remove bacterial cells triggers immediate updates to the grid state. This operation is optimized for responsiveness to user interactions.

### Simulation Logic

- **Interval Management:** The growth simulation uses 'setInterval' to update cell states at regular intervals (configurable by the user). This approach ensures consistent timing for cell division actions.

- **Algorithm Efficiency:** Cell division checks for adjacent empty cells are optimized to minimize computational overhead. However, as grid complexity increases, particularly when nearing full occupancy, performance may slightly degrade due to increased computation per interval.

### Chart Visualization

- **Real-Time Updates:** The line chart for growth rate and final cell count updates in real-time as the simulation progresses. The chart library used (if any) is optimized for handling frequent data updates efficiently.

### Browser Compatibility

- **Cross-Browser Testing:** The application has been tested on major browsers (Chrome, Firefox, Edge) to ensure compatibility and consistent performance across different environments.

### Performance Metrics

- **Frame Rate:** Maintaining a stable frame rate (e.g., 60 FPS) during normal simulation operations.
- **Memory Usage:** Monitoring memory consumption to ensure the application remains responsive and does not cause excessive memory leaks.
- **CPU Utilization:** Tracking CPU usage to optimize simulation logic and rendering processes.

### Optimization Strategies
  
- **State Management:** Efficiently managing state updates to minimize re-renders and optimize component performance.

### Scalability Considerations

- **Grid Size Scaling:** While currently optimized for up to 20x20 grids, future enhancements could include optimizations for larger grids or dynamic resizing based on user requirements.

### Conclusion

The performance of the bacterial cell growth simulation is optimized for real-time interaction and visualization of biological processes. Continuous monitoring and optimization of rendering, simulation logic, and user interface interactions ensure a smooth user experience across different devices and browsers.


## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. Ensure your code adheres to the project's coding standards and includes relevant tests.

## Contact
For any questions or feedback, please reach out to roseysofia@yahoo.com