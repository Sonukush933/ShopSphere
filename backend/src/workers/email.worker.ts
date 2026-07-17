import { Worker, Job } from 'bullmq';
import { bullMQConnection } from '../config/bullmq';
import { WelcomeEmailJob } from '../queues/email.queue';
import { sendEmail } from '../emails/services/email.service';
import welcomeTemplate from '../emails/templates/welcome.template';

export const emailWorker = new Worker<WelcomeEmailJob>(
  'email-queue',

  async (job: Job<WelcomeEmailJob>) => {
    console.log(`📩 Processing Job ${job.id} for ${job.data.email}`);

    try {
      await sendEmail({
        to: job.data.email,
        subject: 'Welcome to ShopSphere 🎉',
        html: welcomeTemplate(job.data.name),
      });

      console.log(`✅ Welcome email sent to ${job.data.email}`);
    } catch (error) {
      console.error(
        `❌ Failed to send welcome email to ${job.data.email}`,
        error,
      );

      // Important: BullMQ ko batana zaroori hai ki job fail hui hai
      // taaki retry (attempts) kaam kare.
      throw error;
    }
  },

  {
    connection: bullMQConnection,
  },
);

// ==============================
// Worker Events
// ==============================

// Job successfully completed
emailWorker.on('completed', (job) => {
  console.log(`✅ Job ${job.id} completed successfully`);
});

// Job failed after retry attempts
emailWorker.on('failed', (job, error) => {
  console.error(`❌ Job ${job?.id} failed: ${error.message}`);
});

// Worker level error
emailWorker.on('error', (error) => {
  console.error('❌ Worker Error:', error);
});
