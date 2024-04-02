import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

const DATA_URL = `http://localhost:3000/api/chart-data`;

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
      const response: AxiosResponse = await axios.get(DATA_URL, {
        params: { selectedChartType, xAxis, yAxis, zAxis },
      });
      console.log(response.data);
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

const chartDataSlice = createSlice({
  name: "chartData",
  initialState,
  reducers: {
    setChartData: (state, action: PayloadAction<any>) => {
      state.chartData = action.payload.chartData;
    },
    setChartRangeIncrement: (state) => {
      state.rangeStart = state.rangeStart + 100;
      state.rangeEnd = state.rangeEnd + 100;
    },
    setChartRangeDecrement: (state) => {
      state.rangeStart = state.rangeStart - 100;
      state.rangeEnd = state.rangeEnd - 100;
    },
    setChartCustomRange: (state, action: PayloadAction<any>) => {
      state.rangeStart = 0;
      state.rangeEnd = action.payload;
    },
    resetChartState: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchChartData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.xAxis = action.payload.xAxis;
        state.yAxis = action.payload.yAxis;
        state.zAxis = action.payload.zAxis;
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      });
  },
});

export const {
  setChartData,
  resetChartState,
  setChartRangeIncrement,
  setChartRangeDecrement,
  setChartCustomRange,
} = chartDataSlice.actions;

export default chartDataSlice.reducer;
