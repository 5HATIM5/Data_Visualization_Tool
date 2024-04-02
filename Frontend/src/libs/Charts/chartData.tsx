import { ChartData } from "chart.js";
import { RootState } from "../../Redux/store";
import { useSelector } from "react-redux";

export const ScatterChartData = (): ChartData<"scatter"> => {
  const { xAxis, yAxis, zAxis, rangeStart, rangeEnd } = useSelector(
    (state: RootState) => state.chartData
  );

  const data = [];

  for (let i = 0; i < yAxis.length; i++) {
    data.push({
      x: yAxis[i],
      y: zAxis[i],
    });
  }

  const limitedXAxis = xAxis.slice(rangeStart, rangeEnd);
  const limitedData = data.slice(rangeStart, rangeEnd);

  return {
    labels: limitedXAxis,
    datasets: [
      {
        label: "(Current,Voltage)",
        data: limitedData,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
};

export const MultiLineChartData = (): ChartData<"line"> => {
  const { xAxis, yAxis, zAxis, rangeStart, rangeEnd } = useSelector(
    (state: RootState) => state.chartData
  );
  const limitedXAxis = xAxis.slice(rangeStart, rangeEnd);
  const limitedYAxis = yAxis.slice(rangeStart, rangeEnd);
  const limitedZAxis = zAxis.slice(rangeStart, rangeEnd);

  console.log(xAxis);
  return {
    labels: limitedXAxis,
    datasets: [
      {
        label: "Current",
        data: limitedYAxis,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Voltage",
        data: limitedZAxis,
        fill: false,
        borderColor: "#EF8E5E",
        tension: 0.1,
      },
    ],
  };
};

export const BarChartData = (): ChartData<"bar"> => {
  const { xAxis, yAxis, zAxis, rangeStart, rangeEnd } = useSelector(
    (state: RootState) => state.chartData
  );
  const limitedXAxis = xAxis.slice(rangeStart, rangeEnd);
  const limitedYAxis = yAxis.slice(rangeStart, rangeEnd);
  const limitedZAxis = zAxis.slice(rangeStart, rangeEnd);

  return {
    labels: limitedXAxis,
    datasets: [
      {
        label: "Current: Avg",
        data: limitedYAxis,
        backgroundColor: "rgb(75, 192, 192, 0.5)",
      },
      {
        label: "Voltage: Avg",
        data: limitedZAxis,
        backgroundColor: "rgb(239, 142, 94, 0.5)",
      },
    ],
  };
};
