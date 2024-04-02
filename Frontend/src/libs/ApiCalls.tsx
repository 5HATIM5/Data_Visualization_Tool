import axios, { AxiosResponse } from "axios";

// Function to send a request to upload a file
export const uploadFileRequest = async (formData: FormData): Promise<any> => {
  try {
    // Send a POST request to upload the file
    const response: AxiosResponse = await axios.post(
      "http://localhost:3000/api/upload/file",
      formData
    );
    return response; // Return the response data
  } catch (error) {
    // Handle errors
    if (axios.isAxiosError(error)) {
      throw error; // Throw Axios error
    }
    console.log("Some other error occurred", error); // Log other errors
  }
};
