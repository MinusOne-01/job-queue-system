import { prisma } from "../configs/prisma.js";

export async function claimJob(workerId) {

    // We use a transaction to ensure the Select and Update are atomic
    return await prisma.$transaction(async (tx) => {
        
        const jobs = await tx.$queryRaw`
            SELECT id 
            FROM "Jobs" 
            WHERE status = 'pending' 
              AND "scheduledAt" <= NOW()
            ORDER BY priority DESC, "scheduledAt" ASC, "createdAt" ASC
            LIMIT 1
            FOR UPDATE SKIP LOCKED
        `;

        if (jobs.length === 0) {
            return null; // No jobs to process
        }

        const jobId = jobs[0].id;

        // 2. Update the job to 'processing'
        const updatedJob = await tx.jobs.update({
            where: { id: jobId },
            data: {
                status: 'processing',
                lockedAt: new Date(),
                lockedBy: workerId,
                updatedAt: new Date()
            }
        });

        return updatedJob;
    });
}