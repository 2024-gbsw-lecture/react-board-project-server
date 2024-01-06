import { prismaClient } from '@/prisma';
import { Comment } from '@prisma/client';
import { CommentDto } from './comment.dto';

const commentSelectFields = {
  id: true,
  content: true,
  postId: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
  user: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },
} as const;

export class CommentRepository {
  findAllByPostId = async (postId: number): Promise<Comment[]> => {
    return await prismaClient.comment.findMany({
      where: {
        postId,
      },
      select: commentSelectFields,
    });
  };

  findOneById = async (id: number): Promise<Comment | null> => {
    return await prismaClient.comment.findUnique({
      where: {
        id,
      },
      select: commentSelectFields,
    });
  };

  create = async (
    commentDto: CommentDto,
    postId: number,
    userId: number,
  ): Promise<Comment> => {
    return await prismaClient.comment.create({
      data: {
        ...commentDto,
        postId,
        userId,
      },
      select: commentSelectFields,
    });
  };

  update = async (id: number, commentDto: CommentDto): Promise<Comment> => {
    return await prismaClient.comment.update({
      data: commentDto,
      where: {
        id,
      },
      select: commentSelectFields,
    });
  };

  delete = async (id: number): Promise<void> => {
    await prismaClient.comment.delete({
      where: {
        id,
      },
    });
  };
}
