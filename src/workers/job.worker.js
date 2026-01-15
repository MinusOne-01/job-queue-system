import { prisma } from "../configs/prisma.js";
import { claimJob } from "../utils/claimJob.js";
import { handleError } from "../utils/handleError.js";
import { executeJob } from "../utils/executeJob.js";

const workerId = "001";

export async function worker(){
    
  while(true){

    const job = await claimJob(workerId);

    if(!job){
        await new Promise((resolve) => setTimeout(resolve, 500));
        continue;
    }

    try{

        await prisma.jobLogs.create({
            data: {
                jobId: job.id,
                level: 'info',
                message: 'Job Started'
            }
        })

        const result = await executeJob();

        await prisma.jobs.update({
            where: {
                id: job.id,
                status: 'processing'
            },
            data: {
                status: 'completed',
                lockedAt: null,
                lockedBy: null,
                updatedAt: new Date()
            }
        });

        await prisma.jobLogs.create({
            data: {
                jobId: job.id,
                level: 'info',
                message: `Job Completed: ${JSON.stringify(result)}`
            }
        })

    }
    catch(err){
        
        await prisma.jobLogs.create({
            data: {
                jobId: job.id,
                level: 'error',
                message: err.message
            }
        })

        await handleError( job.id, err.message );

    }

  }

}

worker();