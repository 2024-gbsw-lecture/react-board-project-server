import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@/enums/http';
import { PostRepository } from './post.repository';

export const detailPostMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const postId = Number(request.params.id);

    const postRepository = new PostRepository();

    const post = await postRepository.findOneById(postId);

    if (post === null) {
      return response.status(HttpStatus.NOT_FOUND).json({
        status: HttpStatus.NOT_FOUND,
        message: '존재하지 않는 게시글',
      });
    }

    request.post = post;

    next();
  } catch (error) {
    next(error);
  }
};
