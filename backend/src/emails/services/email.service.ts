import transporter from '../utils/transporter';

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async ({
  to,
  subject,
  html,
}: SendEmailOptions) => {
  await transporter.sendMail({
    from: `"ShopSphere" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};