import { User } from '@prisma/client';
import { prismaClient } from '../../prisma';
import { SignUpDto } from '../auth/auth.dto';

export class UserRepository {
  findOneById = async (id: number): Promise<User | null> => {
    return await prismaClient.user.findUnique({
      where: {
        id,
      },
    });
  };

  findOneByEmail = async (email: string): Promise<User | null> => {
    return await prismaClient.user.findUnique({
      where: {
        email,
      },
    });
  };

  findOneByEmailAndPassword = async (
    email: string,
    password: string,
  ): Promise<User | null> => {
    return await prismaClient.user.findUnique({
      where: {
        email,
        password,
      },
    });
  };

  create = async (user: SignUpDto): Promise<void> => {
    await prismaClient.user.create({
      data: user,
    });
  };

  saveRefreshToken = async (id: number, refreshToken: string) => {
    await prismaClient.user.update({
      where: {
        id,
      },
      data: {
        refreshToken,
      },
    });
  };
}
