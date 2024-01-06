import { Router } from 'express';
import { authMiddleware } from '@/middlewares/auth';
import { validateBody } from '@/middlewares/body';
import { integerParamsMiddleware } from '@/middlewares/params';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';
import { CommentDto } from './comment.dto';

const commentService = new CommentService(new CommentRepository());

const commentController = new CommentController(commentService);

export const commentRouter = Router();

commentRouter.get('/', commentController.findAll);

commentRouter.get(
  '/:id',
  integerParamsMiddleware('id'),
  commentController.findOneById,
);

commentRouter.post(
  '/',
  authMiddleware,
  validateBody(CommentDto),
  commentController.create,
);

commentRouter.patch(
  '/:id',
  integerParamsMiddleware('id'),
  authMiddleware,
  validateBody(CommentDto),
  commentController.update,
);

commentRouter.delete(
  '/:id',
  integerParamsMiddleware('id'),
  authMiddleware,
  commentController.delete,
);
