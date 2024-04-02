// Import necessary modules
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the interface for file upload state
interface FileUploadState {
  isLoading: boolean; // Flag to indicate if file upload is in progress
  errorMessage: string | null; // Error message if file upload fails
  file: boolean; // Flag to indicate if a file has been uploaded successfully
}

// Define the initial state for file upload
const initialState: FileUploadState = {
  isLoading: false,
  errorMessage: null,
  file: false,
};

// Create a slice for managing file upload state
const fileUploadSlice = createSlice({
  name: "fileUpload",
  initialState,
  reducers: {
    // Reducer to reset file upload state to initial state
    resetFileUploadState: () => initialState,

    // Reducer to set loading state during file upload
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Reducer to set error message if file upload fails
    setErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload;
    },

    // Reducer to set file upload status
    setFile: (state, action: PayloadAction<boolean>) => {
      state.file = action.payload;
    },
  },
});

// Export actions and reducer
export const {
  setLoading,
  setErrorMessage,
  setFile,
  resetFileUploadState,
} = fileUploadSlice.actions;

export default fileUploadSlice.reducer;
