import { Request, Response } from "express";
import { getChartData } from "../helpers/chartData.helper";

interface ChartDataQuery {
  selectedChartType: string;
  xAxis: string;
  yAxis: string;
  zAxis: string | null;
}

interface ResponseBody {}

interface RequestBody {}

interface RequestQuery {}

export const getChartDataController = async (
  req: Request<ChartDataQuery, ResponseBody, RequestBody, RequestQuery>,
  res: Response
) => {
  try {
    const {
      selectedChartType,
      xAxis,
      yAxis,
      zAxis,
    } = req.query as ChartDataQuery;
    console.log(selectedChartType, xAxis, yAxis, zAxis);

    // Query the database to retrieve data based on user preferences
    const chartData = await getChartData(
      selectedChartType,
      xAxis,
      yAxis,
      zAxis
    );

    // Send the formatted data as the response
    res.status(200).json(chartData);
  } catch (error) {
    console.error("Error chart dashboard data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
