import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodTypeAny } from 'zod';
import ApiError from '../utils/ApiError';

type ValidationSchemas = {
  body?: ZodTypeAny;
  params?: ZodTypeAny;
  query?: ZodTypeAny;
};

export const validate = (schemas: ValidationSchemas) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }

      if (schemas.params) {
        Object.assign(req.params, schemas.params.parse(req.params));
      }

      if (schemas.query) {
        Object.assign(req.query, schemas.query.parse(req.query));
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(new ApiError(400, 'Validation Failed', error.issues));
      }

      next(error);
    }
  };
};
