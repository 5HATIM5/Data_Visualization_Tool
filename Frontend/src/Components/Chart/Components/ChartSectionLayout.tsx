import ChartControls from "./ChartControls"; // Importing chart controls component
import {
  ArrowDownTrayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline"; // Importing icon component
import {
  BarChartData,
  MultiLineChartData,
  ScatterChartData,
} from "../../../libs/Charts/chartData"; // Importing chart data
import {
  BarChartOptions,
  MultiLineChartOptions,
  ScatterChartOptions,
} from "../../../libs/Charts/chartOptions"; // Importing chart options
import { useRef } from "react"; // Importing useRef hook
import { Bar, Line, Scatter } from "react-chartjs-2"; // Importing chart components
import { saveAs } from "file-saver";
import { b64toBlob } from "../../../libs/Helpers/Functions";
import { useDispatch } from "react-redux";
import {
  setChartRangeDecrement,
  setChartRangeIncrement,
} from "../../../Redux/Slice/ChartDataSlice";

type Props = {
  chartRefName: string; // Type for props, specifying the chart reference name
};

const ChartSectionLayout = (props: Props) => {
  const dispatch = useDispatch();
  const chartRef = useRef<any>(null); // Reference to the chart component

  const handleNextRange = () => {
    dispatch(setChartRangeIncrement());
  };

  const handlePreviousRange = () => {
    dispatch(setChartRangeDecrement());
  };

  return (
    <div className="flex flex-col justify-center items-center md:items-stretch md:flex-row mb-5">
      {/* Chart Container */}
      <div className="relative flex-1 md:mr-4">
        {/* Download Chart Button */}
        <button
          onClick={() => {
            const b64 = chartRef.current
              .toBase64Image()
              .replace("data:image/png;base64,", "");
            const content = b64toBlob(b64);
            const file = new File([content], "chart.png", {
              type: "image/png",
            });
            saveAs(file);
          }}
          className="absolute h-5 w-5 top-0 left-0 m-4 animate-pulse"
        >
          <ArrowDownTrayIcon />
        </button>

        {/* Chart Component */}
        <div className="border rounded-lg p-4 bg-white">
          {/* Render the chart based on the chartRefName prop */}
          {props.chartRefName === "scatterChart" && (
            <Scatter
              ref={chartRef}
              data={ScatterChartData()}
              options={ScatterChartOptions()}
              id="stackD"
            />
          )}
          {props.chartRefName === "multiLineChart" && (
            <Line
              ref={chartRef}
              data={MultiLineChartData()}
              options={MultiLineChartOptions()}
              id="stackD"
            />
          )}
          {props.chartRefName === "barChart" && (
            <Bar
              ref={chartRef}
              data={BarChartData()}
              options={BarChartOptions()}
              id="stackD"
            />
          )}

          <button
            onClick={handlePreviousRange}
            className="absolute bottom-4 left-4 text-blue-500"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>

          {/* Next arrow button */}

          <button
            onClick={handleNextRange}
            className="absolute bottom-4 right-4 text-blue-500"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Controls Container */}
      <div className="flex w-80 lg:ml-4">
        {/* Render chart controls based on the chartRefName prop */}
        {props.chartRefName === "scatterChart" && (
          <ChartControls
            chartRefName={props.chartRefName}
            chartRef={chartRef}
          />
        )}
        {props.chartRefName === "multiLineChart" && (
          <ChartControls
            chartRefName={props.chartRefName}
            chartRef={chartRef}
          />
        )}
        {props.chartRefName === "barChart" && (
          <ChartControls
            chartRefName={props.chartRefName}
            chartRef={chartRef}
          />
        )}
      </div>
    </div>
  );
};

export default ChartSectionLayout;
