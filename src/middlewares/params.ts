import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@/enums/http';

const validateIntegerParams = (
  request: Request,
  response: Response,
  key: string,
) => {
  const numberParam = Number(request.params[key]);

  if (!Number.isInteger(numberParam)) {
    return response.status(HttpStatus.INVALID).json({
      status: HttpStatus.INVALID,
      message: '정수 숫자 형태의 파라미터가 있어야함',
    });
  }
};

export const integerParamsMiddleware =
  (key: string | string[]) =>
  (request: Request, response: Response, next: NextFunction) => {
    if (Array.isArray(key)) {
      for (const query of key) {
        validateIntegerParams(request, response, query);
      }
    } else {
      validateIntegerParams(request, response, key);
    }

    next();
  };
