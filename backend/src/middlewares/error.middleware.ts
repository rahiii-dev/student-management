import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/errors/AppError';
import { getEnvironmentConfig } from '../config/environment.config';

const { NODE_ENV } = getEnvironmentConfig();

const errorMiddleware = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Something went wrong';

  if (!err.isOperational) {
    console.error('ERROR: ', err);
  }

  res.status(statusCode).json({
    message,
    stack: NODE_ENV === 'development' && !err.isOperational ? err.stack : null,
  });
};

export default errorMiddleware;
