import ScrollDown from "../Global/ScrollDown";
import FileUpload from "./Components/FileUpload"; // Importing the FileUpload component
import PolygonBottom from "../Global/PolygonBottom";
import PolygonTop from "../Global/PolygonTop";
import { useEffect, useState } from "react";
import Loader from "../Global/Loader";

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  // Simulating loading state with a delay of 2 seconds
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  // Render Loader component while loading is true, otherwise render content
  return loading ? (
    <Loader />
  ) : (
    <div className="relative isolate px-6 lg:px-8 max-h-screen">
      {/* Visual Backdrop */}
      <PolygonTop />
      <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-32">
        <div className="text-center">
          {/* Title and description */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Powerful Data Visualization and Analysis Tool{" "}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600  sm:text-SM">
            Transform Your Data into Actionable Insights with our Dynamic and
            Powerful Data Visualization and Analysis Tool.
          </p>
        </div>
        <div className="mt-6 flex items-center justify-center">
          {/* FileUpload component for drag and drop file uploader */}
          <FileUpload />
        </div>
      </div>
      {/* Visual Backdrop */}
      <PolygonBottom />

      {/* Scroll Down Arrow */}
      <ScrollDown />
    </div>
  );
};

export default HomePage;
