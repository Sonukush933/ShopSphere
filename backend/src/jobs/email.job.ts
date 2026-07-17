import { emailQueue } from '../queues/email.queue';

interface AddWelcomeEmailJobOptions {
  name: string;
  email: string;
}

export const addWelcomeEmailJob = async ({
  name,
  email,
}: AddWelcomeEmailJobOptions) => {
  await emailQueue.add('welcome-email', {
    name,
    email,
  });
};