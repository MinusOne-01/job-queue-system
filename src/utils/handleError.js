import { prisma } from "../configs/prisma.js";

export async function handleError(jobId, error) {
  const errorMessage = error instanceof Error ? error.message : String(error);

  return await prisma.$executeRaw`
    UPDATE "Jobs"
    SET 
      attempts = attempts + 1,
      status = CASE 
                 WHEN attempts + 1 >= "maxAttempts" THEN 'dead'::"Job_status"
                 ELSE 'pending'::"Job_status"
               END,
      "scheduledAt" = CASE 
                       WHEN attempts + 1 >= "maxAttempts" THEN "scheduledAt" 
                       ELSE NOW() + INTERVAL '10 seconds'
                     END,
      "lockedAt" = NULL,
      "lockedBy" = NULL,
      "lastError" = ${errorMessage},
      "updatedAt" = NOW()
    WHERE id = ${jobId}
      AND status = 'processing';
  `;
}