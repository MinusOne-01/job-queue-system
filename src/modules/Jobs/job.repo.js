import { prisma } from "../../configs/prisma.js"

export async function createJob_db( jobDetails ){

    return await prisma.jobs.create({
        data: {
            ...jobDetails
        }
    });

}

export async function fetchJobs_db( status, limit, cursorCondition ){

    return await prisma.jobs.findMany({
        where: {
            status: status ?? undefined,
            ...cursorCondition
         },
        orderBy: { createdAt: "desc" },
        take: limit
    });

}

export async function fetchJobInfo_db( id ){

    return await prisma.jobs.findUnique({
        where: { id }
    });

}

export async function fetchJobLogs_db( id ){

    return await prisma.jobLogs.findMany({
        where: { id },
        orderBy: { createdAt: "asc" }
    });

}

export async function retryUpdate_db( id ){

    return await prisma.jobs.updateMany({
        where: {
            id,
            status: {
                in: ['failed', 'dead'],
            },
        },
        data: {
            status: 'pending',
            lockedAt: null,
            lockedBy: null,
        }
    });

}

export async function cancelUpdate_db( id ){

    return await prisma.jobs.update({
        where: { id },
        data: {
            status: 'cancelled'
        }
    });

}

