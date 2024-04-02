// Import necessary modules
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define the interface for chart reset state
interface ChartResetState {
  lineChartRef: any; // Reference to line chart component
  scatterChartRef: any; // Reference to scatter chart component
}

// Define the initial state for chart reset
const initialState: ChartResetState = {
  lineChartRef: null,
  scatterChartRef: null,
};

// Create a slice for managing chart reset
const chartResetSlice = createSlice({
  name: "chartReset",
  initialState,
  reducers: {
    // Reducer to set the reference to the line chart component
    setLineChartRef: (state, action: PayloadAction<any>) => {
      state.lineChartRef = action.payload;
    },
    // Reducer to set the reference to the scatter chart component
    setScatterChartRef: (state, action: PayloadAction<any>) => {
      state.scatterChartRef = action.payload;
    },
    // Reducer to reset chart zoom based on chart type
    resetChartZoom: (state, action: PayloadAction<string>) => {
      if (action.payload === "line") {
        state.lineChartRef?.resetZoom();
      } else if (action.payload === "scatter") {
        state.scatterChartRef?.resetZoom();
      }
    },
  },
});

// Export actions and reducer
export const {
  setLineChartRef,
  setScatterChartRef,
  resetChartZoom,
} = chartResetSlice.actions;

export default chartResetSlice.reducer;
