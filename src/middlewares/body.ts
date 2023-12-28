import { Request, Response, NextFunction } from 'express';
import { ValidationError, validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { HttpStatus } from '@/enums/http';

export const validateBody = <T extends { new (): any }>(schema: T) => {
  return async function (
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const target = plainToClass(schema, request.body);

    try {
      await validateOrReject(target);

      next();
    } catch (error) {
      let message = '검증 오류';

      const errors = error as ValidationError[];

      if (Array.isArray(errors)) {
        const { constraints } = errors[0];

        if (constraints !== undefined) {
          message = Object.values(constraints)[0];
        }
      }

      response.status(HttpStatus.INVALID).json({
        status: HttpStatus.INVALID,
        message,
      });
    }
  };
};
