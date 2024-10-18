import { NextFunction, Request, Response } from 'express';

const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({
    message: `URL: ${req.originalUrl} not found`,
    metod: `${req.method}`,
  });
};

export default notFoundMiddleware;
