import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@/enums/http';
import { CommentService } from './comment.service';
import { CommentDto } from './comment.dto';

export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  findAll = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const comments = await this.commentService.findAll(request.post.id);

      response.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: '댓글 조회 성공',
        data: comments,
      });
    } catch (error) {
      next(error);
    }
  };

  findOneById = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(request.params.id);

      const comment = await this.commentService.findOneById(id);

      response.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: '댓글 조회 성공',
        data: comment,
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
      const postId = Number(request.params.postId);

      const commentDto = request.body as CommentDto;

      const comment = await this.commentService.create(
        commentDto,
        postId,
        request.user.id,
      );

      response.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: '댓글 생성 성공',
        data: comment,
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

      const commentDto = request.body as CommentDto;

      const comment = await this.commentService.update(
        id,
        commentDto,
        request.user.id,
      );

      response.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: '댓글 수정 성공',
        data: comment,
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

      await this.commentService.delete(id, request.user.id);

      response.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: '댓글 삭제 성공',
      });
    } catch (error) {
      next(error);
    }
  };
}
