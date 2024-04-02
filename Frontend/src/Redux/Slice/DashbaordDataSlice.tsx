import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

const DATA_URL = `http://localhost:3000/api/dashboard/data`;

interface ChartResetState {
  dashboardData: boolean;
  totalRecords: number;
  duplicateRecords: number;
  status: string;
  error: any;
}

const initialState: ChartResetState = {
  dashboardData: false,
  totalRecords: 0,
  duplicateRecords: 0,
  status: "idle",
  error: null,
};

export const fetchDashboardData = createAsyncThunk(
  "data/fetchDashboardData",
  async () => {
    console.log("function called")
    try {
      const response: AxiosResponse = await axios.get(DATA_URL);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      } else {
        throw error; // Rethrow unexpected errors
      }
    }
  }
);

const dashboardDataSlice = createSlice({
  name: "dashboardData",
  initialState,
  reducers: {
    setDashbaordData: (state, action: PayloadAction<any>) => {
      state.dashboardData = action.payload.dashboardData;
    },
    resetDashbaordState: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.totalRecords = action.payload.total_records;
        state.duplicateRecords = action.payload.duplicate_records;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      });
  },
});

export const { setDashbaordData,resetDashbaordState } = dashboardDataSlice.actions;

export default dashboardDataSlice.reducer;
