import { Router } from "express";
import { addJob, cancelJob, getJobInfo, getJobLogs, getJobs, retryJob } from "./job.controller.js";

const router = Router();

router.post("/", addJob);
router.get("/", getJobs);
router.get("/:id", getJobInfo);
router.get("/:id/logs", getJobLogs);
router.post("/:id/retry", retryJob);
router.post("/:id/cancel", cancelJob);

export default router;