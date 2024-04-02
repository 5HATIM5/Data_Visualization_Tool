// Import necessary functions and modules for Redux toolkit and Axios
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

// Define the URL from which to fetch data
const DATA_URL = `http://localhost:3000/api/dashboard/data`;

// Define the structure of the initial state for the slice
interface ChartResetState {
  dashboardData: boolean;
  totalRecords: number;
  duplicateRecords: number;
  status: string;
  error: any;
}

// Define the initial state values
const initialState: ChartResetState = {
  dashboardData: false,
  totalRecords: 0,
  duplicateRecords: 0,
  status: "idle",
  error: null,
};

// Define an asynchronous thunk function to fetch dashboard data
export const fetchDashboardData = createAsyncThunk(
  "data/fetchDashboardData",
  async () => {
    console.log("function called"); // Log that the function has been called
    try {
      const response: AxiosResponse = await axios.get(DATA_URL); // Fetch data from the defined URL
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

// Create a slice for dashboard data management
const dashboardDataSlice = createSlice({
  name: "dashboardData",
  initialState,
  reducers: {
    // Reducer to set dashboard data
    setDashbaordData: (state, action: PayloadAction<any>) => {
      state.dashboardData = action.payload.dashboardData;
    },
    // Reducer to reset dashboard state
    resetDashbaordState: () => initialState,
  },
  extraReducers(builder) {
    // Define extra reducers based on the status of the asynchronous thunk
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.status = "loading"; // Set status to loading when data fetching is pending
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.status = "succeeded"; // Set status to succeeded when data fetching is successful
        state.totalRecords = action.payload.total_records; // Set total records from the fetched data
        state.duplicateRecords = action.payload.duplicate_records; // Set duplicate records from the fetched data
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.status = "failed"; // Set status to failed when data fetching is rejected
        state.error = action.error.message || "An error occurred"; // Set error message
      });
  },
});

// Export actions and reducer
export const { setDashbaordData, resetDashbaordState } = dashboardDataSlice.actions;
export default dashboardDataSlice.reducer;
