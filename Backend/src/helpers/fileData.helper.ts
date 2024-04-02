import fs from "fs";
import csvParser from "csv-parser";
import { FileData } from "../entity/FileData";
import { AppDataSource } from "../database/data-source";
import { EntityMetadata } from "typeorm/metadata/EntityMetadata";

// Variable to keep track of skipped records during CSV parsing
let skippedRecords: number = 0;

/**
 * Function to parse a CSV file and insert data into the database.
 * @param filePath Path to the CSV file.
 * @returns Promise that resolves with an array of parsed data.
 */
export const parseCsvFile = (filePath: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const results: any[] = [];
    const seen = new Set();
    skippedRecords = 0;
    const batchInsertSize = 5000; // Adjust batch size as needed
    let batchInsertValues: any[] = [];
    const entityMetadata: EntityMetadata = AppDataSource.getMetadata(FileData);
    const excludedColumns: string[] = ["id"];

    // Filter out excluded columns and then extract database names from entity metadata
    const columnNames = entityMetadata.columns
      .filter((column) => !excludedColumns.includes(column.propertyName))
      .map((column) => column.databaseName);

    // Read the CSV file stream and parse its contents
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", async (data: object) => {
        // Validate CSV row (example: check if required columns are present)

        if (!columnNames.every((column) => data.hasOwnProperty(column))) {
          // If required columns are missing, return a custom error response
          const errorMessage =
            "Invalid CSV file. Required columns are missing.";
          reject(new Error(errorMessage));
          return; // Stop further processing
        }
        const dataString = JSON.stringify(data);
        // Check if the current record has already been seen
        if (!seen.has(dataString)) {
          seen.add(dataString);
          batchInsertValues.push(data); // Accumulate data for batch insert

          // If batch size reached, perform bulk insert
          if (batchInsertValues.length >= batchInsertSize) {
            insertBatch(batchInsertValues).catch((error) => reject(error)); // Reject promise on error
            batchInsertValues = []; // Reset batch array
          }
        } else {
          skippedRecords++; // Increment the count of skipped records
        }
      })
      .on("end", () => {
        // Perform final bulk insert for remaining records
        if (batchInsertValues.length > 0) {
          insertBatch(batchInsertValues)
            .then(() => resolve(results))
            .catch((error) => reject(error)); // Reject promise on error
        } else {
          resolve(results);
        }
      })
      .on("error", reject);
  });
};

/**
 * Function to truncate the database table and reset the identity column.
 */
export const truncateDatabase = async () => {
  try {
    // Truncate the database table and reset the identity column
    const fileDataRepository = AppDataSource.getRepository(FileData);
    const tableName = fileDataRepository.metadata.tableName;
    await fileDataRepository.query(
      `TRUNCATE TABLE ${tableName} RESTART IDENTITY`
    );
  } catch (error) {
    console.error("Error truncating file data:", error);
    throw error; // Propagate the error to the caller
  }
};

/**
 * Function to retrieve dashboard data, including total records and skipped records.
 * @returns Object containing total records and skipped records.
 */
export const getDashboardData = async () => {
  try {
    // Get the total number of records in the database
    const fileDataRepository = AppDataSource.getRepository(FileData);
    const totalCount = await fileDataRepository.count();

    // Return an object containing total records and skipped records
    return {
      total_records: totalCount,
      duplicate_records: getSkippedRecords(),
    };
  } catch (error) {
    console.error("Error retrieving dashboard data:", error);
    throw error; // Propagate the error to the caller
  }
};

/**
 * Getter function to retrieve the value of skippedRecords.
 * @returns The number of skipped records.
 */
export const getSkippedRecords = () => {
  return skippedRecords;
};

const insertBatch = async (batch: any[]): Promise<void> => {
  try {
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(FileData)
      .values(batch)
      .execute();
  } catch (error) {
    console.error("Error performing bulk insert:", error);
    throw error;
  }
};
