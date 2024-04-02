import { Request, Response } from "express";
import multer from "multer";
import fs from "fs";
import {
  getDashboardData,
  parseCsvFile,
  truncateDatabase,
} from "../helpers/fileData.helper";

const upload = multer({ dest: "uploads/" });

/**
 * Controller function to handle file upload and CSV parsing.
 * @param req Express request object.
 * @param res Express response object.
 */
export const uploadFileController = (req: Request, res: Response) => {
  // Handle file upload using multer middleware
  upload.single("csvFile")(req, res, async (uploadErr: any) => {
    // Check for upload error
    if (uploadErr) {
      return res.status(400).send("Upload failed: " + uploadErr.message);
    }

    // Truncate database before parsing new CSV file
    await truncateDatabase();

    // Get file path from multer's file object
    const filePath = (req.file as Express.Multer.File).path;

    try {
      // Parse CSV file
      await parseCsvFile(filePath).then(() => {
        // If parsing is successful, send success response
        res.status(200).send("CSV file uploaded and parsed successfully.");
      });
    } catch (error) {
      // If an error occurs during parsing, handle it and send an error response
      console.error("Error parsing CSV:", error);
      res.status(500).send("Error parsing CSV: " + error.message);
    } finally {
      // Cleanup: Remove uploaded file after parsing
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Error removing uploaded file:", unlinkErr);
        }
      });
    }
  });
};

/**
 * // Controller function to handle the request for dashboard data
 * @param req Express request object.
 * @param res Express response object.
 */
export const getDashboardDataController = async (
  req: Request,
  res: Response
) => {
  try {
    // Call the helper function to retrieve dashboard data
    const dashboardData = await getDashboardData();

    // Send the dashboard data as a JSON response
    res.status(200).json(dashboardData);
  } catch (error) {
    console.error("Error retrieving dashboard data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
