import { FileData } from "../entity/FileData";
import { AppDataSource } from "../database/data-source";

export const getChartData = async (
  type: string,
  xAxis: string,
  yAxis: string,
  zAxis: string
) => {
  try {
    const data = await AppDataSource.getRepository(FileData)
      .createQueryBuilder("file_data")
      .select([
        `${xAxis}`,
        `AVG(${yAxis}) as current`,
        `AVG(${zAxis}) as voltage`,
      ]) // Select the desired column
      .groupBy(xAxis)
      .orderBy(xAxis)
      .getRawMany();

    const xValues = data.map((row) => row[xAxis]);
    const yValues = data.map((row) => row[yAxis]);
    const zValues = data.map((row) => row[zAxis]);

    // Return the x and y values as arrays with keys
    return { xAxis: xValues, yAxis: yValues, zAxis: zValues };
    // }
  } catch (error) {
    console.error("Error getting the data:", error);
    throw error; // Propagate the error to the caller
  }
};
