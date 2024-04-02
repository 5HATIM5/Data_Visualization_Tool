import SectionLoader from "../../Global/SectionLoader"; // Importing the SectionLoader component
import { DragEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import {
  setLoading,
  setErrorMessage,
  setFile,
  resetFileUploadState,
} from "../../../Redux/Slice/FileUploadSlice"; // Importing action creators from the FileUploadSlice
import Popover from "../../Global/Popover";
import { Link } from "react-router-dom";
import { uploadFileRequest } from "../../../libs/Services/UploadFileRequest";
import { resetDashbaordState } from "../../../Redux/Slice/DashbaordDataSlice";

type Props = {};

const FileUpload = (_props: Props) => {
  const dispatch = useDispatch();
  const [isDragOver, setIsDragOver] = useState(false);
  const { isLoading, errorMessage, file } = useSelector(
    (state: RootState) => state.fileUpload
  );

  // Function to upload file
  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("csvFile", file);
    try {
      const response = await uploadFileRequest(formData);
      console.log("Response:", response.data);
      dispatch(setFile(true)); // Set file uploaded state to true
    } catch (error:any) {
      console.log("err:", error);
      dispatch(
        setErrorMessage(error.response ? error.response.data : error.message)
      ); // Dispatch error message if upload fails
      dispatch(setFile(false)); // Set file uploaded state to false
    }
  };

  // Function to validate file type
  const validateFileType = async (file: File) => {
    const allowedExtensions = ["csv"];
    const fileName = file.name;
    const fileExtension = fileName.split(".").pop()?.toLowerCase();
    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      dispatch(setErrorMessage("Invalid file type. Allowed type: csv"));
      dispatch(setFile(false));
    } else {
      try {
        await uploadFile(file);
      } catch (error) {
        console.log("err:", error);
      }
    }
  };

  // Event handler for drag over
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  // Event handler for file drop
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      dispatch(setLoading(true));
      dispatch(setFile(false));
      setTimeout(async () => {
        await validateFileType(droppedFile); // Validate file after 1 second
        dispatch(setLoading(false)); // Stop loading after file validation
      }, 1000); // Simulating loading for 1 second
    }
  };

  // Event handler for file input change
  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const droppedFile = event.target.files;
    if (droppedFile) {
      dispatch(setLoading(true));
      dispatch(setFile(false));
      setTimeout(async () => {
        await validateFileType(droppedFile[0]); // Validate file after 1 second
        dispatch(setLoading(false)); // Stop loading after file validation
      }, 1000); // Simulating loading for 1 second
    }
  };

  useEffect(() => {
    dispatch(resetFileUploadState()); 
    dispatch(resetDashbaordState()); 
  }, []);

  // Function to render file input element
  const renderFileInput = () => (
    <input
      type="file"
      id="fileInput"
      className="hidden"
      accept=".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      onChange={handleFileInputChange}
    />
  );

  return (
    <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-center text-2xl sm:text-lg font-semibold mb-4 text-gray-800">
        Upload Your CSV File To Run Insights
      </h1>

      {/* Drag and drop area */}
      <div
        className="bg-gray-100 p-4 h-28 text-center mb-4 rounded-lg border-dashed border-2 border-gray-300 hover:border-fuchsia-800 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
        id="dropzone"
        onDragOver={handleDragOver}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        style={{
          backgroundColor: isDragOver
            ? "#F3DFF2"
            : "rgb(243 244 246 / var(--tw-bg-opacity))",
        }}
      >
        {/* Show loader or file upload label */}
        {isLoading ? (
          <SectionLoader />
        ) : (
          <label
            htmlFor="fileInput"
            className="cursor-pointer flex flex-col items-center space-y-2"
          >
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>

            <span className="text-gray-600">Drag and drop your files here</span>
            <span className="text-gray-500 text-sm">(or click to select)</span>
            {errorMessage && <Popover errorType={errorMessage} />}
          </label>
        )}
        {/* Render file input */}
        {renderFileInput()}
      </div>

      {/* Show success message and link to charts page if file uploaded */}
      {file && (
        <div className="flex justify-around items-center">
          <span className="text-green-500 text-sm ">Uploaded Sucessfully.</span>
          <Link
            to="/charts"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Start Analysis <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
