import { prisma } from "../configs/prisma.js";

/**
 * Rescues jobs that have been 'processing' for more than 10 minutes.
 */

export async function rescueStaleJobs() {
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

    try {
        const result = await prisma.jobs.updateMany({
            where: {
                status: 'processing',
                lockedAt: {
                    lt: tenMinutesAgo
                }
            },
            data: {
                status: 'pending',
                lockedAt: null,
                lockedBy: null,
                lastError: 'Timeout/Worker Crash'
            }
        });

        if (result.count > 0) {
            console.log(`[Cleanup] Rescued ${result.count} stale jobs.`);
        }
    } catch (err) {
        console.error("[Cleanup] Error rescuing stale jobs:", err.message);
    }
}