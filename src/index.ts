import dotenv from "dotenv";
import { ERROR_EVENTS } from "./common/errors.js";
import { registerCollectionJob } from "./jobs/collection-job.js";
import { validateEnv } from "./lib/env.js";
import { startRedis } from "./redis/redis.js";
import { startDailyWorker } from "./worker/collection-worker.js";
import { logger } from "./common/logger.js";

dotenv.config({ path: ".env.development" });

const main = async () => {
  try {
    logger.info("🚀 Initializing service");

    const env = validateEnv();

    ERROR_EVENTS.forEach((event: string) =>
      process.on(event, async (err) => {
        console.error(err);
        await worker.close();
        process.exit(1);
      })
    );
    const redis = startRedis(env);

    const worker = startDailyWorker(redis);

    //await registerCollectionJob();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

main();
