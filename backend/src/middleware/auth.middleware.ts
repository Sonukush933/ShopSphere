import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.model';
import asyncHandler from '../utils/asyncHandler';
import ApiError from '../utils/ApiError';

export const verifyJWT = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token =
      req.cookies?.accessToken ||
      req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new ApiError(401, 'Unauthorized request');
    }

    // 👇 Declare decodedToken
    let decodedToken: jwt.JwtPayload;

    try {
      decodedToken = jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET as string,
      ) as jwt.JwtPayload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new ApiError(401, 'Access token expired');
      }

      if (error instanceof jwt.JsonWebTokenError) {
        throw new ApiError(401, 'Invalid access token');
      }

      throw new ApiError(401, 'Unauthorized request');
    }

    const user = await User.findById(decodedToken._id).select(
      '-password -refreshToken',
    );

    if (!user) {
      throw new ApiError(401, 'Invalid Access Token');
    }

    req.user = user;

    next();
  },
);
