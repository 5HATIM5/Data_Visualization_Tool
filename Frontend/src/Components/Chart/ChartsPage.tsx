import PolygonBottom from "../Global/PolygonBottom";
import PolygonTop from "../Global/PolygonTop";
import ScrollDown from "../Global/ScrollDown";

import Card from "./Components/Card";
import GenerateChartSection from "./Components/GenerateChartSection";
import { useEffect } from "react";
import Loader from "../Global/Loader";

// Importing necessary Chart.js modules and plugins
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { fetchDashboardData } from "../../Redux/Slice/DashbaordDataSlice";
import { useNavigate } from "react-router-dom"; // version 5.2.0

// Registering Chart.js modules and plugins
Chart.register(zoomPlugin, CategoryScale);

type Props = {};

const ChartsPage = (_props: Props) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { status, error, totalRecords, duplicateRecords } = useSelector(
    (state: RootState) => state.dashboardData
  );

  const { file } = useSelector((state: RootState) => state.fileUpload);

  useEffect(() => {
    // Check the current path
    !file && navigate("/");

    if (status === "idle") {
      dispatch<any>(fetchDashboardData());
    }
  }, [status, dispatch]);

  if (status === "loading" || status === "idle") {
    return <Loader />;
  }

  if (status === "failed") {
    return (
      <div>
        <h2>Error: {error}</h2>
      </div>
    );
  }

  return (
    // Render page content once data is fetched
    <div className="relative isolate px-6 lg:px-8 max-h-screen">
      {/* Visual Backdrop */}
      <PolygonTop />

      <div className="mx-auto max-w-5xl py-32 sm:py-48 lg:py-28 ">
        {/* Header */}
        <div className="container mx-auto md:px-1">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight text-center md:text-left">
            Data Visualization
          </h1>
        </div>

        {/* Dashboard Data Information Container */}
        <div className="flex justify-center items-center py-4">
          <div className="mt-3 w-screen px-10 md:px-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {/* Information Cards */}
            <Card
              keyNum={1}
              records={totalRecords + duplicateRecords}
              desc={"No of Records in CSV"}
            />
            <Card
              keyNum={2}
              records={duplicateRecords}
              desc={"No of Duplicate Records"}
            />
            <Card
              keyNum={3}
              records={totalRecords}
              desc={"No of Valid Records"}
            />
          </div>
        </div>

        {/* Generate Dynamic Charts */}
        <GenerateChartSection />
      </div>

      {/* Visual Backdrop */}
      <PolygonBottom />

      {/* Scroll Down Arrow */}
      <ScrollDown />
    </div>
  );
};

export default ChartsPage;
