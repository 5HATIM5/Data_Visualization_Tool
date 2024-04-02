// Import necessary dependencies
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import {
  updateXAxisLabel,
  updateYAxisLabel,
  updateLegends,
  updateAxisColor,
} from "../../../Redux/Slice/ChartOptionSlice";
import { setChartCustomRange } from "../../../Redux/Slice/ChartDataSlice";

// Define the Props type for the component
type Props = {
  chartRefName: string;
  chartRef: any;
};

// Define the ChartControls component
const ChartControls = (props: Props) => {
  // Select relevant chart options from the Redux store
  const { multiLineChart, scatterChart, barChart } = useSelector(
    (state: RootState) => state.chartOption
  );

  // Initialize useDispatch hook to dispatch actions
  const dispatch = useDispatch();

  // Define local state variables to manage chart options
  const [xAxisLabel, setXAxisLabel] = useState("");
  const [yAxisLabel, setYAxisLabel] = useState("");
  const [chartLegends, setChartLegends] = useState(false);
  const [axisColor, setAxisColor] = useState("#000000");
  const [totalRange, setTotalRange] = useState(100);

  // Define function to reset zoom of the chart
  const handleResetZoom = () => {
    if (props.chartRef.current) {
      props.chartRef.current.resetZoom();
    }
  };

  // Define object to map chart types to update functions for chart options
  const updateFunctions: any = {
    multiLineChart: {
      updateXAxis: updateXAxisLabel,
      updateYAxis: updateYAxisLabel,
      defaultXAxis: multiLineChart.xAxisLabel,
      defaultYAxis: multiLineChart.yAxisLabel,
      updateLegends: updateLegends,
      updateAxisColor: updateAxisColor,
    },
    scatterChart: {
      updateXAxis: updateXAxisLabel,
      updateYAxis: updateYAxisLabel,
      defaultXAxis: scatterChart.xAxisLabel,
      defaultYAxis: scatterChart.yAxisLabel,
      updateLegends: updateLegends,
      updateAxisColor: updateAxisColor,
    },
    barChart: {
      updateXAxis: updateXAxisLabel,
      updateYAxis: updateYAxisLabel,
      defaultXAxis: barChart.xAxisLabel,
      defaultYAxis: barChart.yAxisLabel,
      updateLegends: updateLegends,
      updateAxisColor: updateAxisColor,
    },
  };

  // Define function to save changes made to chart options
  const handleSaveChanges = () => {
    const chartType = props.chartRefName;
    if (chartType in updateFunctions) {
      const {
        updateXAxis,
        updateYAxis,
        defaultXAxis,
        defaultYAxis,
        updateLegends,
        updateAxisColor,
      } = updateFunctions[chartType];

      const updatedXAxisLabel = xAxisLabel || defaultXAxis;
      const updatedYAxisLabel = yAxisLabel || defaultYAxis;
      const updatedLegends = chartLegends;
      const updatedColor = axisColor;

      // Dispatch actions to update chart options in Redux store
      dispatch(
        updateXAxis({
          chartType: chartType,
          xAxisLabel: updatedXAxisLabel,
        })
      );
      dispatch(
        updateYAxis({
          chartType: chartType,
          yAxisLabel: updatedYAxisLabel,
        })
      );
      dispatch(
        updateLegends({
          chartType: chartType,
          legends: updatedLegends,
        })
      );
      dispatch(
        updateAxisColor({
          chartType: chartType,
          axisColor: updatedColor,
        })
      );
      dispatch(setChartCustomRange(totalRange))

      // Reset input fields
      setXAxisLabel("");
      setYAxisLabel("");
    }
  };

  // Return JSX for rendering chart controls
  return (
    <div className="bg-white border p-4 rounded-lg w-full">
      {/* Control Inputs */}
      <div className="mb-4">
        <label
          htmlFor="xAxisLabel"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          X-Axis Label:
        </label>
        <input
          id="xAxisLabel"
          value={xAxisLabel}
          className="bg-white border border-gray-300 mb-2 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
          onChange={(e) => setXAxisLabel(e.target.value)}
        />
        <label
          htmlFor="yAxisLabel"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Y-Axis Label:
        </label>
        <input
          id="yAxisLabel"
          value={yAxisLabel}
          className="bg-white border border-gray-300 mb-2 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
          onChange={(e) => setYAxisLabel(e.target.value)}
        />
      </div>
      <div>
        <div className="flex justify-center items-center">
          <div className="flex items-center mb-4 w-1/3 justify-between">
            <label
              htmlFor="default-checkbox"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Legends:
            </label>
            <input
              id="default-checkbox"
              type="checkbox"
              checked={chartLegends}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={(e) => setChartLegends(e.target.checked)}
            />
          </div>
          <div className="flex items-center justify-center mb-4  w-2/3">
            <label
              htmlFor="default-checkbox"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 mr-2"
            >
              Data Range:
            </label>
            <input
              type="number"
              id="number-input"
              aria-describedby="helper-text-explanation"
              placeholder="100"
              className="bg-gray-50 border w-16 h-8 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setTotalRange(e.target.valueAsNumber)}
            />
          </div>
        </div>
      </div>
      <div className="w-full mb-4">
        <label
          htmlFor="xAxisColor"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Axis Color:
        </label>
        <input
          type="color"
          id="xAxisColor"
          name="xAxisColor"
          value={axisColor}
          onChange={(e) => setAxisColor(e.target.value)}
          className="block w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button
          className="bg-gray-200 text-teal-700 font-medium text-[12px] py-2 px-8 rounded transition duration-300 ease-in-out hover:bg-teal-100 hover:text-teal-900"
          onClick={handleResetZoom}
        >
          Reset Zoom
        </button>
        <button
          className="bg-gray-200 text-teal-700 font-medium text-[12px] py-2 px-7 rounded transition duration-300 ease-in-out hover:bg-teal-100 hover:text-teal-900"
          onClick={handleSaveChanges}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

// Export the ChartControls component as the default export
export default ChartControls;
