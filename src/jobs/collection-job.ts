import { dailyQueue } from "../queue/collection-queue.js";

export async function registerCollectionJob() {
  await dailyQueue.add(
    "call-fake-api",
    { source: "cron" },
    {
      repeat: {
        every: 24 * 60 * 60 * 1000, // 24 h
      },
      attempts: 5,
      backoff: {
        type: "exponential",
        delay: 1000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    }
  );
}
