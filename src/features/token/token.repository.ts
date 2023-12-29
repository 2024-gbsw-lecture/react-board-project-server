import { prismaClient } from '@/prisma';
import { RefreshToken } from '@prisma/client';

export class TokenRepository {
  findOneByToken = async (token: string): Promise<RefreshToken | null> => {
    return await prismaClient.refreshToken.findFirst({
      where: {
        token,
      },
    });
  };

  create = async (token: string, userId: number) => {
    return await prismaClient.refreshToken.create({
      data: {
        token,
        userId,
      },
    });
  };

  update = async (id: number, token: string): Promise<RefreshToken> => {
    return await prismaClient.refreshToken.update({
      data: {
        token,
      },
      where: {
        id,
      },
    });
  };

  delete = async (id: number): Promise<RefreshToken> => {
    return await prismaClient.refreshToken.delete({
      where: {
        id,
      },
    });
  };
}
