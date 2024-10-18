import { NextFunction, Response } from 'express';
import { AppError } from '../utils/errors/AppError';
import JWTUtils from '../utils/jwt.utils';
import { AuthRequest } from '../interfaces/auth.interface';

export const isAuthenticated = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Autherisation token is missing', 401));
  }
  const token = authHeader.split(' ')[1];
  const verified = JWTUtils.verifyToken(token);
  const decoded = JWTUtils.decodeToken(token);

  if (verified && decoded) {
    req.user = {
      id: decoded.userId,
      role: decoded.role,
    };
    return next();
  }

  return next(new AppError('Invalid or expired token', 401));
};

export const isTeacher = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== 'teacher') {
    return next(new AppError('Accecc Denied', 403));
  }

  next();
};

export const isStudent = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== 'student') {
    return next(new AppError('Accecc Denied', 403));
  }

  next();
};
