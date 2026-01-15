import { rescueStaleJobs } from "../utils/cleanup.js"

const CLEANUP_INTERVAL = 60 * 1000; // 1 minute

function startCleanupWorker() {
    console.log("Cleanup worker started: Monitoring for stale jobs...");

    setInterval(async () => {
        await rescueStaleJobs();
    }, CLEANUP_INTERVAL);
}

startCleanupWorker();