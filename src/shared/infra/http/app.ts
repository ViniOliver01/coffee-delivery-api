import cors from "cors";
import express, { NextFunction, Request, Response } from "express";

import "dotenv/config";
import "express-async-errors";

import "../../container";

import upload from "../../../config/upload";
import { AppError } from "../../errors/AppError";
import createConnection from "../typeorm";
import { router } from "./routes";

createConnection();
const app = express();

app.use(express.json());

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(cors());

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message });
  }

  return response.status(500).json({
    status: "Error",
    message: `Internal Server Error - ${err.message}`,
  });
});

export { app };
