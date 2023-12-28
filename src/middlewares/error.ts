import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../libs/custom-error';
import { HttpStatus } from '../enums/http';

export const errorMiddleware = (
  error: unknown,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const customError = error as CustomError;

  const status = customError?.status || HttpStatus.SERVER_ERROR;
  const message = customError?.message || '서버 오류';

  response.status(status).json({
    status,
    message,
  });
};
