import "reflect-metadata";
import { DataSource } from "typeorm";
import { FileData } from "../entity/FileData";
import dotenv from "dotenv";
import 'dotenv/config';

// Load environment variables from .env file
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [FileData],
  migrations: [],
  subscribers: [],
});
