import { cancelUpdate, createJob, fetchJobInfo, fetchJobLogs, fetchJobs, retryUpdate } from "./job.service.js";

export async function addJob(req, res, next){
    try{
        const { type, payload, priority, maxAttempts, scheduledAt } = req.body;

        if ( !type || !payload ) {
            return res.status(400).json({
                message: "missing job details!"
            });
        }

        const jobDetails = { type, payload, priority, maxAttempts, scheduledAt }

        const job = await createJob(jobDetails);

        res.json( job );
    }
    catch(err){
        next(err);
    }
}

export async function getJobs(req, res, next){
    try{
        const { status, cursorId, cursorCreatedAt } = req.query;
        
        const limit = parseInt(req.query.limit) || 2;

        const allJobs = await fetchJobs( status, limit, cursorId, cursorCreatedAt );

        res.json({ All_Jobs: allJobs });
    }
    catch(err){
        next(err);
    }

}

export async function getJobInfo(req, res, next){
    try{

        const { id } = req.params;

        if ( !id ) {
            return res.status(400).json({
                message: "missing job id!"
            });
        }

        const jobData = await fetchJobInfo( id );

        res.json({ Job_Data: jobData });

    }
    catch(err){
        next(err);
    }
}

export async function getJobLogs(req, res, next){
    try{

        const { id } = req.params;

        if ( !id ) {
            return res.status(400).json({
                message: "missing job id!"
            });
        }

        const jobLogs = await fetchJobLogs( id );

        if(jobLogs.length === 0){
            return res.json({ Job_Logs: "No logs available" });
        }

        res.json({ Job_Logs: jobLogs });

    }
    catch(err){
        next(err);
    }
}

export async function retryJob(req, res, next){
    try{
        const { id } = req.params;

        if ( !id ) {
            return res.status(400).json({
                message: "missing job id!"
            });
        }

        const jobUpdated = await retryUpdate( id );

        if(jobUpdated.count === 0){
            res.json({ Message: "No jobs updated" });
        }

        res.json({ Job_updated: "Job updation complete!" });

    }
    catch(err){
        next(err);
    }
}

export async function cancelJob(req, res, next){
    try{
        const { id } = req.params;

        if ( !id ) {
            return res.status(400).json({
                message: "missing job id!"
            });
        }

        const jobCancelled = await cancelUpdate( id );

        if(jobCancelled.length === 0){
            res.json({ Message: "No jobs cancelled" });
        }

        res.json({ Job_Cancelled: jobCancelled });

    }
    catch(err){
        next(err);
    }
}

