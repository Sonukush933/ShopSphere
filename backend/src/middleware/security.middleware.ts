import { Express } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';

export const applySecurityMiddleware = (app: Express) => {
  app.use(helmet());

  app.use(compression());

  app.use(
    mongoSanitize({
      replaceWith: '_',
    }),
  );

  app.use(hpp());

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: {
        success: false,
        message: 'Too many requests. Please try again later.',
      },
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );
};