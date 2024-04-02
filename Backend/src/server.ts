import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import { logger } from "./middleware/logEvents";
import cors from "cors";
import corsOptions from "./config/corsOption";
import "reflect-metadata";
import { AppDataSource } from "./database/data-source";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// routes
app.get("/", (req: Request, res: Response) => {
  res.send("Express += TypeScript Server");
});
app.use("/api", require("./routes/fileData.routes"));
app.use("/api", require("./routes/chartData.routes"));

// other routes 404 page
app.all("*", (req: Request, res: Response) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

AppDataSource.initialize()
  .then(async () => {
    console.log("Database Connected");
  })
  .catch((error) => console.log(error));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
