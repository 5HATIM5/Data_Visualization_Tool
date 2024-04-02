import { ChartOptions } from "chart.js";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

// Function to generate options for a scatter chart
export const ScatterChartOptions = (): ChartOptions<"scatter"> => {
  const { scatterChart } = useSelector((state: RootState) => state.chartOption);

  return {
    plugins: {
      title: {
        display: true,
        text: "Voltage and Current spread Over Time",
      },
      legend: {
        display: scatterChart.legends,
      },
      zoom: {
        pan: {
          enabled: true,
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "xy",
        },
      },
    },
    scales: {
      x: {
        type: "linear",
        position: "bottom",

        title: {
          display: true,
          text: scatterChart.xAxisLabel,
          color: scatterChart.axisColor,
        },
      },
      y: {
        title: {
          display: true,
          text: scatterChart.xAxisLabel,
          color: scatterChart.axisColor,
        },
      },
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 8,
      },
    },
  };
};

// Function to generate options for a multi-line chart
export const MultiLineChartOptions = (): ChartOptions<"line"> => {
  const { multiLineChart } = useSelector(
    (state: RootState) => state.chartOption
  );

  return {
    plugins: {
      title: {
        display: true,
        text: "Voltage and Current spread Over Time",
      },
      legend: {
        display: multiLineChart.legends,
        position: "bottom",
      },
      zoom: {
        pan: {
          enabled: true,
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "xy",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: multiLineChart.xAxisLabel,
          color: multiLineChart.axisColor,
        },
      },
      y: {
        title: {
          display: true,
          text: multiLineChart.xAxisLabel,
          color: multiLineChart.axisColor,
        },
      },
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 8,
      },
    },
  };
};

// Function to generate options for a bar chart
export const BarChartOptions = (): ChartOptions<"bar"> => {
  const { barChart } = useSelector((state: RootState) => state.chartOption);

  return {
    plugins: {
      legend: {
        display: barChart.legends,
        position: "bottom",
      },
      title: {
        display: true,
        text: "Voltage and Current spread Over Time",
      },
      zoom: {
        pan: {
          enabled: true,
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "xy",
        },
      },
    },
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        title: {
          display: true,
          text: barChart.xAxisLabel,
          color: barChart.axisColor,
        },
      },
      y: {
        type: "linear",
        title: {
          display: true,
          text: barChart.yAxisLabel,
          color: barChart.axisColor,
        },
      },
    },
  };
};
