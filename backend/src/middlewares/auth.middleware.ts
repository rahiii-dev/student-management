import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/errors/AppError';
import JWTUtils from '../utils/jwt.utils';

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Autherisation token is missing', 401));
  }
  const token = authHeader.split(' ')[1];
  const decoded = JWTUtils.verifyToken(token);

  if (decoded) {
    return next();
  }

  return next(new AppError('Invalid or expired token', 401));
};


