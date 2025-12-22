import { Queue } from "bullmq";
import { getRedis } from "../redis/redis.js";


export const dailyQueue = new Queue("daily-job", {
  connection: getRedis(),
});
