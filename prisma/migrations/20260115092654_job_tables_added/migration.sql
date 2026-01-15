-- CreateEnum
CREATE TYPE "Job_status" AS ENUM ('pending', 'processing', 'completed', 'failed', 'dead');

-- CreateEnum
CREATE TYPE "Levels" AS ENUM ('info', 'error');

-- CreateTable
CREATE TABLE "Jobs" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "status" "Job_status" NOT NULL DEFAULT 'pending',
    "priority" INTEGER NOT NULL,
    "attempts" INTEGER NOT NULL,
    "maxAttempts" INTEGER NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lockedAt" TIMESTAMP(3) NOT NULL,
    "lockedBy" TEXT NOT NULL,
    "lastError" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobLogs" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "level" "Levels" NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "JobLogs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JobLogs" ADD CONSTRAINT "JobLogs_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
