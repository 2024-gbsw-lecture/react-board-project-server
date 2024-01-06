import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '@/enums/http';
import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from './post.dto';

export class PostController {
  constructor(private readonly postService: PostService) {}

  findAll = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const page = Number(request.query?.page || 0);
      const size = Number(request.query?.size || 20);

      if (
        !(Number.isInteger(page) && Number.isInteger(size)) ||
        page < 0 ||
        size < 0
      ) {
        response.status(HttpStatus.OK).json({
          status: HttpStatus.INVALID,
          message: '페이지와 크기는 정수값이어야함',
        });
      } else {
        const pageableResponse = await this.postService.findAll(page, size);

        response.status(HttpStatus.OK).json({
          status: HttpStatus.OK,
          message: 'success',
          data: pageableResponse,
        });
      }
    } catch (error) {
      next(error);
    }
  };

  findOneById = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const postId = Number(request.params.id);

      const post = await this.postService.findOneById(postId);

      response.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'success',
        data: post,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const createPostDto = request.body as CreatePostDto;

      const post = await this.postService.create(
        createPostDto,
        request.user.id,
      );

      response.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'success',
        data: post,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = Number(request.params.id);
      const updatePostDto = request.body as UpdatePostDto;

      const post = await this.postService.update(
        id,
        updatePostDto,
        request.user.id,
      );

      response.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'success',
        data: post,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = Number(request.params.id);

      await this.postService.delete(id, request.user.id);

      response.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'success',
      });
    } catch (error) {
      next(error);
    }
  };
}
