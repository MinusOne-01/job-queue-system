import { cancelUpdate_db, createJob_db, fetchJobInfo_db, fetchJobLogs_db, fetchJobs_db, retryUpdate_db } from "./job.repo.js";

export async function createJob( jobDetails ){
    try {
        const job = await createJob_db( jobDetails );

        return job;
    }
    catch (error) {
        throw (error);
    }
}

export async function fetchJobs( status, limit, cursorId, cursorCreatedAt ){
    try{
        let cursorCondition = {};
        if (cursorId && cursorCreatedAt) {
            cursorCondition = {
                OR: [
                    { createdAt: { lt: cursorCreatedAt } },
                    {
                        createdAt: cursorCreatedAt,
                        id: { lt: cursorId }
                    }
                ]
            };
        }

        const items = await fetchJobs_db( status, limit, cursorCondition );

        let nextCursor = null;

        if (items.length === limit) {
            const last = items[items.length - 1];
            nextCursor = {
                createdAt: last.createdAt,
                id: last.id
            };
        }

        return { items, nextCursor };
    }
    catch(error){
        throw(error);
    }

}

export async function fetchJobInfo( id ){
    try{

        const item = await fetchJobInfo_db( id );

        return item;

    }
    catch(error){
        throw(error);
    }
}

export async function fetchJobLogs( id ){
    try{

        const item = await fetchJobLogs_db( id );

        return item;

    }
    catch(error){
        throw(error);
    }
}

export async function retryUpdate( id ){
    try{

        const job = await retryUpdate_db( id );
        
        return job;
        
    }
    catch(error){
        throw(error)
    }
}

export async function cancelUpdate( id ){
    try{

        const job = await cancelUpdate_db( id );
        
        return job;
        
    }
    catch(error){
        throw(error)
    }
}