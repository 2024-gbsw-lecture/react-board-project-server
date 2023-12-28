import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@/libs/token';
import { HttpStatus } from '../enums/http';
import { UserRepository } from '../features/user/user.repository';

export const authMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const authorization = request.headers.authorization || '';

    const accessToken = authorization.replace('Bearer ', '');

    const decodedToken = await verifyToken(accessToken);

    const userRepository = new UserRepository();

    const user = await userRepository.findOneById(decodedToken.id);

    if (user === null) {
      return response.status(HttpStatus.NOT_FOUND).json({
        status: HttpStatus.NOT_FOUND,
        message: '존재하지 않는 사용자',
      });
    }

    request.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
