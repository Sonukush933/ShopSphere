import { Queue } from 'bullmq';
import { bullMQConnection } from '../config/bullmq';

export interface WelcomeEmailJob {
  name: string;
  email: string;
}

export const emailQueue = new Queue<WelcomeEmailJob>('email-queue', {
  connection: bullMQConnection,

  defaultJobOptions: {
    attempts: 3,

    backoff: {
      type: 'exponential',
      delay: 5000,
    },

    // Keep last 1000 successful jobs
    removeOnComplete: 1000,

    // Keep last 5000 failed jobs
    removeOnFail: 5000,
  },
});
