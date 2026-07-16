import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";
import ApiError from "../utils/ApiError";

export const validateRequest = (

  schema: ZodType

) => {

  return (

    req: Request,

    res: Response,

    next: NextFunction

  ) => {

    try {

      req.body = schema.parse(req.body);

      next();

    }

    catch (error) {

      if (error instanceof ZodError) {

        throw new ApiError(

          400,

          "Validation Failed",

          error.issues

        );

      }

      next(error);

    }

  };

};