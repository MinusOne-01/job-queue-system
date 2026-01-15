import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/error.middleware.js";
import jobRoutes from "./modules/Jobs/job.routes.js"

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

app.use("/jobs", jobRoutes);

app.use(errorHandler);


export default app;