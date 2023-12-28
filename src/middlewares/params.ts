import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@/enums/http';

export const integerParamsMiddleware =
  (name: string) =>
  (request: Request, response: Response, next: NextFunction) => {
    const numberParam = Number(request.params[name]);

    if (!Number.isInteger(numberParam)) {
      return response.status(HttpStatus.INVALID).json({
        status: HttpStatus.INVALID,
        message: '정수 숫자 형태의 파라미터가 있어야함',
      });
    }

    next();
  };
