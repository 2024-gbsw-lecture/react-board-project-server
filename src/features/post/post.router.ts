import { Router } from 'express';
import { validateBody } from '@/middlewares/body';
import { integerParamsMiddleware } from '@/middlewares/params';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { PostController } from './post.controller';
import { authMiddleware } from '../../middlewares/auth';
import { CreatePostDto, UpdatePostDto } from './post.dto';

const postService = new PostService(new PostRepository());
const postController = new PostController(postService);

export const postRouter = Router();

postRouter.get('/', postController.findAll);
postRouter.get('/:id', integerParamsMiddleware('id'), postController.findById);
postRouter.post(
  '/',
  authMiddleware,
  validateBody(CreatePostDto),
  postController.create,
);
postRouter.patch(
  '/:id',
  integerParamsMiddleware('id'),
  authMiddleware,
  validateBody(UpdatePostDto),
  postController.update,
);
postRouter.delete(
  '/:id',
  integerParamsMiddleware('id'),
  authMiddleware,
  postController.delete,
);
