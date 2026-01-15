import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// genrate jobs for stresstest

async function main() {
  console.log('Clearing existing jobs...');
  await prisma.jobs.deleteMany({});

  const jobTypes = ['SEND_EMAIL', 'PROCESS_IMAGE', 'GENERATE_REPORT', 'SYNC_DATA'];
  const totalJobs = 50;
  const jobsData = [];

  console.log(`Generating ${totalJobs} pending jobs...`);

  for (let i = 0; i < totalJobs; i++) {
    jobsData.push({
      type: jobTypes[Math.floor(Math.random() * jobTypes.length)],
      payload: { 
        userId: Math.floor(Math.random() * 1000), 
        ref: `REF-${i}` 
      },
      status: 'pending',
      priority: Math.floor(Math.random() * 10), // Random priority 0-9
      maxAttempts: 3,

      scheduledAt: new Date(), 
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  const created = await prisma.jobs.createMany({
    data: jobsData,
    skipDuplicates: true,
  });

  console.log(`✅ Successfully seeded ${created.count} jobs.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });