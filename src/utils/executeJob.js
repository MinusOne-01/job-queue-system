/**
 * Dummy function to simulate job execution
 */

export async function executeJob(job) {

    // 1. Simulate some network/processing delay (e.g., 100ms)
    await new Promise((resolve) => setTimeout(resolve, 100));

    // 2. Get random number and check divisibility by 2
    const randomNumber = Math.floor(Math.random() * 100) + 1;

    if (randomNumber % 2 === 0) {
        return { 
            success: true, 
            data: randomNumber 
        };
    } else {
        throw new Error(`Execution failed: Server error...`);
    }
}