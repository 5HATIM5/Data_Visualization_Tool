// Import necessary modules
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define the interface for chart options
interface ChartOptions {
  scatterChart: {
    xAxisLabel: string;
    yAxisLabel: string;
    legends: boolean;
    axisColor: string;
  };
  multiLineChart: {
    xAxisLabel: string;
    yAxisLabel: string;
    legends: boolean;
    axisColor: string;
  };
  barChart: {
    xAxisLabel: string;
    yAxisLabel: string;
    legends: boolean;
    axisColor: string;
  };
  [key: string]: {
    xAxisLabel: string;
    yAxisLabel: string;
    legends: boolean;
    axisColor: string;
  };
}

// Define the initial state for chart options
const initialState: ChartOptions = {
  scatterChart: {
    xAxisLabel: "Index/Progress",
    yAxisLabel: "value",
    legends: false,
    axisColor: "black",
  },
  multiLineChart: {
    xAxisLabel: "Index/Progress",
    yAxisLabel: "value",
    legends: false,
    axisColor: "black",
  },
  barChart: {
    xAxisLabel: "Index/Progress",
    yAxisLabel: "value",
    legends: false,
    axisColor: "black",
  },
};

// Create a slice for managing chart options
const chartOptionSlice = createSlice({
  name: "chartOption",
  initialState,
  reducers: {
    // Reducer to update x-axis label for a specific chart type
    updateXAxisLabel: (
      state,
      action: PayloadAction<{ chartType: string; xAxisLabel: string }>
    ) => {
      const { chartType, xAxisLabel } = action.payload;
      state[chartType].xAxisLabel = xAxisLabel;
    },
    // Reducer to update y-axis label for a specific chart type
    updateYAxisLabel: (
      state,
      action: PayloadAction<{ chartType: string; yAxisLabel: string }>
    ) => {
      const { chartType, yAxisLabel } = action.payload;
      state[chartType].yAxisLabel = yAxisLabel;
    },
    // Reducer to update legends visibility for a specific chart type
    updateLegends: (
      state,
      action: PayloadAction<{ chartType: string; legends: boolean }>
    ) => {
      const { chartType, legends } = action.payload;
      state[chartType].legends = legends;
    },
    // Reducer to update axis color for a specific chart type
    updateAxisColor: (
      state,
      action: PayloadAction<{
        chartType: string;
        axisColor: string;
      }>
    ) => {
      const { chartType, axisColor } = action.payload;
      state[chartType].axisColor = axisColor;
    },
  },
});

// Export actions and reducer
export const {
  updateXAxisLabel,
  updateYAxisLabel,
  updateLegends,
  updateAxisColor,
} = chartOptionSlice.actions;

export default chartOptionSlice.reducer;
