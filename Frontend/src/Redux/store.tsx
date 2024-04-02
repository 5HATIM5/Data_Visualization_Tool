// Import necessary modules
import { configureStore } from "@reduxjs/toolkit";
import fileUploadReducer from "./Slice/FileUploadSlice";
import chartResetReducer from "./Slice/ChartResetSlice";
import chartOptionReducer from "./Slice/ChartOptionSlice";
import dashboardDataReducer from "./Slice/DashbaordDataSlice";
import chartDataReducer from "./Slice/ChartDataSlice";

// Configure the Redux store with reducers
export const store = configureStore({
  reducer: {
    fileUpload: fileUploadReducer, // Reducer for managing file upload state
    chartReset: chartResetReducer, // Reducer for managing chart reset state
    chartOption: chartOptionReducer, // Reducer for managing chart options state
    chartData: chartDataReducer,
    dashboardData: dashboardDataReducer, // Reducer for managing dashboard data state
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {fileUpload: FileUploadState, chartReset: ChartResetState, chartOption: ChartOptionState, dashboardData: DashboardDataState}
export type AppDispatch = typeof store.dispatch;
