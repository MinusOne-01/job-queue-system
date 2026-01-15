-- AlterTable
ALTER TABLE "JobLogs" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "JobLogs_jobId_createdAt_idx" ON "JobLogs"("jobId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "Jobs_priority_scheduledAt_createdAt_idx" ON "Jobs"("priority" DESC, "scheduledAt", "createdAt");

-- CreateIndex
CREATE INDEX "Jobs_createdAt_idx" ON "Jobs"("createdAt" DESC);
