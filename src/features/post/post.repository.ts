import { Post } from '@prisma/client';
import { prismaClient } from '../../prisma';
import { CreatePostDto, UpdatePostDto } from './post.dto';

export class PostRepository {
  findAll = async (
    page: number,
    size: number,
  ): Promise<[number, Omit<Post, 'content'>[]]> => {
    return await prismaClient.$transaction([
      prismaClient.post.count(),

      prismaClient.post.findMany({
        skip: page * size,
        take: size,
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          title: true,
          createdAt: true,
          updatedAt: true,
          userId: true,
          user: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
      }),
    ]);
  };

  findById = async (id: number): Promise<Post | null> => {
    return await prismaClient.post.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });
  };

  create = async (post: CreatePostDto, userId: number): Promise<Post> => {
    return await prismaClient.post.create({
      data: {
        ...post,
        userId,
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });
  };

  update = async (id: number, post: UpdatePostDto): Promise<Post> => {
    return await prismaClient.post.update({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
      data: post,
    });
  };

  delete = async (id: number): Promise<Post> => {
    return await prismaClient.post.delete({
      where: {
        id,
      },
    });
  };
}
