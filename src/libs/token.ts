import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { HttpStatus } from '@/enums/http';
import { dotenv } from './dotenv';
import { CustomError } from './custom-error';

export const generateAccessToken = (userId: number): string => {
  const accessToken = sign(
    {
      id: userId,
    },
    dotenv.JWT_SECRET,
    {
      algorithm: 'HS512',
      expiresIn: dotenv.ACCESS_TOKEN_EXPIRES,
    },
  );

  return accessToken;
};

export const generateRefreshToken = (userId: number): string => {
  const refreshToken = sign(
    {
      id: userId,
    },
    dotenv.JWT_SECRET,
    {
      algorithm: 'HS512',
      expiresIn: dotenv.REFRESH_TOKEN_EXPIRES,
    },
  );

  return refreshToken;
};

type ErrorCallback = {
  onExpired?: () => Promise<void>;
};

export const verifyToken = async (
  token: string,
  errorCallback?: ErrorCallback,
): Promise<JwtPayload> => {
  try {
    const decodedToken = (await verify(token, dotenv.JWT_SECRET)) as JwtPayload;

    const userId = Number(decodedToken?.id);

    if (!Number.isInteger(userId)) {
      throw new CustomError(HttpStatus.UN_AUTHORIZATION, '올바르지 않은 토큰');
    }

    return decodedToken;
  } catch (error) {
    let status: HttpStatus = HttpStatus.UN_AUTHORIZATION;
    let message = '';

    const errorMessage = (error as Error)?.message || '';

    switch (errorMessage) {
      case 'jwt must be provided':
        message = '토큰이 필수로 있어야함';

        break;

      case 'invalid token':
      case 'jwt malformed':
      case 'jwt signature is required':
      case 'invalid signature':
        message = '올바르지 않은 토큰';

        break;

      case 'jwt expired':
        message = '만료된 토큰';

        await errorCallback?.onExpired?.call(undefined);

        break;

      default:
        status = HttpStatus.SERVER_ERROR;
        message = '서버 오류';
    }

    throw new CustomError(status, message);
  }
};
