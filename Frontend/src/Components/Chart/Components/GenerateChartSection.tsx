import { useState } from "react";
import ChartSectionLayout from "./ChartSectionLayout";
import { fetchChartData } from "../../../Redux/Slice/ChartDataSlice";
import { useDispatch } from "react-redux";

type Props = {};

const GenerateChartSection = (_props: Props) => {
  const dispatch = useDispatch();

  const [selectedChartType, setSelectedChartType] = useState(""); // State for selected chart type
  const [xAxis, setXAxis] = useState(""); // State for selected X-axis
  const [yAxis, setYAxis] = useState(""); // State for selected Y-axis
  const [zAxis, setZAxis] = useState(""); // State for selected Z-axis

  const [isChartGenerated, setIsChartGenerated] = useState(false); // State to track if chart is generated

  // Function to handle chart generation
  const handleGenerateChart = () => {
    // Check if all fields are selected
    console.log(selectedChartType, xAxis, yAxis, zAxis);
    if (selectedChartType && xAxis && yAxis && zAxis) {
      setIsChartGenerated(true);
      dispatch<any>(fetchChartData({ selectedChartType, xAxis, yAxis, zAxis }));
    } else {
      setIsChartGenerated(false);
      alert("Please select options for all fields."); // Alert user to select options for all fields
    }
  };

  const zAxisOptions = ["Choose an Option", "current", "voltage"].filter(
    (option) => option !== yAxis
  );

  const handleYAxisChange = (e: { target: { value: any } }) => {
    const selectedValue = e.target.value;
    setYAxis(selectedValue);
    // Disable corresponding option in zAxis select
    if (selectedValue !== "") {
      setZAxis(""); // Reset zAxis if y-axis is selected
    }
  };

  return (
    <>
      <div className="">
        {/* Form for selecting chart options */}
        <div className="border p-2 rounded-lg flex flex-col justify-center md:flex-row md:justify-between md:items-end mt-2 mb-5">
          {/* Select chart type */}
          <div className="md:w-1/5 w-full ">
            <label
              htmlFor="charType"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select Chart Type
            </label>
            <select
              id="chartType"
              required
              value={selectedChartType}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => {
                setSelectedChartType(e.target.value),
                  setIsChartGenerated(false);
              }}
            >
              <option value={""}>Choose an Option</option>
              <option value={"MLC"}>Multi Line Chart</option>
              <option value={"SC"}>Scatter Chart</option>
              <option value={"BC"}>Bar Chart</option>
            </select>
          </div>
          {/* Select X-axis */}
          <div className=" md:w-1/5 w-full">
            <label
              htmlFor="xAxis"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select X Axis
            </label>
            <select
              id="xAxis"
              value={xAxis}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => {
                setXAxis(e.target.value);
              }}
              required
            >
              <option value={""}>Choose an Option</option>
              <option value="time">Time</option>
              <option value="cycle_number">Cycle Number</option>
            </select>
          </div>
          {/* Select Y-axis */}
          <div className=" md:w-1/5 w-full=">
            <label
              htmlFor="yAxis"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select Value
            </label>
            <select
              id="yAxis"
              value={yAxis}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleYAxisChange}
              required
            >
              <option value={""}>Choose an Option</option>
              <option value="current">Current</option>
              <option value="voltage">Voltage</option>
            </select>
          </div>
          {/* Select Z-axis */}
          <div className=" md:w-1/5 w-full=">
            <label
              htmlFor="zAxis"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select Value
            </label>
            <select
              id="zAxis"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={zAxis}
              onChange={(e) => setZAxis(e.target.value)}
              required
            >
              {zAxisOptions.map((option) => (
                <option key={option} value={option}>
                  {option === "" ? "Choose an Option" : option.charAt(0).toUpperCase() + option.slice(1)}
                  {/* {option}  */}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <button
              disabled={!selectedChartType || !xAxis || !yAxis || !zAxis}
              onClick={handleGenerateChart}
              className="bg-teal-600 text-gray-100 font-medium text-[13px] py-3 px-5 rounded transition duration-300 ease-in-out hover:bg-teal-100 hover:text-teal-900"
            >
              Generate Chart
            </button>
          </div>
        </div>
        {/* Render chart if generated */}
        {isChartGenerated && (
          <>
            {selectedChartType === "MLC" && (
              <ChartSectionLayout chartRefName="multiLineChart" />
            )}
            {selectedChartType === "SC" && (
              <ChartSectionLayout chartRefName="scatterChart" />
            )}
            {selectedChartType === "BC" && (
              <ChartSectionLayout chartRefName="barChart" />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default GenerateChartSection;
