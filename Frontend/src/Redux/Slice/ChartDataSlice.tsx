// Import necessary functions and modules for Redux toolkit and Axios
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

// Define the URL from which to fetch chart data
const DATA_URL = `http://localhost:3000/api/chart-data`;

// Define the structure of the initial state for the chart data slice
interface ChartDataState {
  chartData: boolean;
  xAxis: number[];
  yAxis: number[];
  zAxis: number[];
  status: string;
  error: any;
  rangeStart: number;
  rangeEnd: number;
}

// Define the initial state values for chart data
const initialState: ChartDataState = {
  chartData: false,
  xAxis: [],
  yAxis: [],
  zAxis: [],
  status: "idle",
  error: null,
  rangeStart: 0,
  rangeEnd: 100,
};

// Define an asynchronous thunk function to fetch chart data
export const fetchChartData = createAsyncThunk(
  "data/fetchChartData",
  async ({
    selectedChartType,
    xAxis,
    yAxis,
    zAxis,
  }: {
    selectedChartType: string;
    xAxis: string;
    yAxis: string;
    zAxis: string;
  }) => {
    try {
      // Fetch chart data from the defined URL with specified parameters
      const response: AxiosResponse = await axios.get(DATA_URL, {
        params: { selectedChartType, xAxis, yAxis, zAxis },
      });
      console.log(response.data); // Log the fetched data
      return response.data; // Return the fetched data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error; // Throw Axios errors
      } else {
        throw error; // Rethrow unexpected errors
      }
    }
  }
);

// Create a slice for chart data management
const chartDataSlice = createSlice({
  name: "chartData",
  initialState,
  reducers: {
    // Reducer to set chart data
    setChartData: (state, action: PayloadAction<any>) => {
      state.chartData = action.payload.chartData;
    },
    // Reducer to increment chart range
    setChartRangeIncrement: (state) => {
      state.rangeStart = state.rangeStart + 100;
      state.rangeEnd = state.rangeEnd + 100;
    },
    // Reducer to decrement chart range
    setChartRangeDecrement: (state) => {
      state.rangeStart = state.rangeStart - 100;
      state.rangeEnd = state.rangeEnd - 100;
    },
    // Reducer to set custom chart range
    setChartCustomRange: (state, action: PayloadAction<any>) => {
      state.rangeStart = 0;
      state.rangeEnd = action.payload;
    },
    // Reducer to reset chart state
    resetChartState: () => initialState,
  },
  extraReducers(builder) {
    // Define extra reducers based on the status of the asynchronous thunk
    builder
      .addCase(fetchChartData.pending, (state) => {
        state.status = "loading"; // Set status to loading when data fetching is pending
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.status = "succeeded"; // Set status to succeeded when data fetching is successful
        state.xAxis = action.payload.xAxis; // Set x-axis data from the fetched data
        state.yAxis = action.payload.yAxis; // Set y-axis data from the fetched data
        state.zAxis = action.payload.zAxis; // Set z-axis data from the fetched data
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.status = "failed"; // Set status to failed when data fetching is rejected
        state.error = action.error.message || "An error occurred"; // Set error message
      });
  },
});

// Export actions and reducer for chart data management
export const {
  setChartData,
  resetChartState,
  setChartRangeIncrement,
  setChartRangeDecrement,
  setChartCustomRange,
} = chartDataSlice.actions;

export default chartDataSlice.reducer;
