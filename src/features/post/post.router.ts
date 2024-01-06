import { Router } from 'express';
import { validateBody } from '@/middlewares/body';
import { integerParamsMiddleware } from '@/middlewares/params';
import { authMiddleware } from '../../middlewares/auth';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { PostController } from './post.controller';
import { CreatePostDto, UpdatePostDto } from './post.dto';
import { CommentController } from './comment/comment.controller';
import { CommentService } from './comment/comment.service';
import { CommentRepository } from './comment/comment.repository';
import { CommentDto } from './comment/comment.dto';

const postService = new PostService(new PostRepository());

const postController = new PostController(postService);

export const postRouter = Router();

postRouter.get('/', postController.findAll);
postRouter.get(
  '/:id',
  integerParamsMiddleware('id'),
  postController.findOneById,
);
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

const commentService = new CommentService(new CommentRepository(), postService);

const commentController = new CommentController(commentService);

postRouter.get(
  '/:postId/comments',
  integerParamsMiddleware('postId'),
  commentController.findAll,
);

postRouter.get(
  '/:postId/comments/:id',
  integerParamsMiddleware(['postId', 'id']),
  commentController.findOneById,
);

postRouter.post(
  '/:postId/comments',
  integerParamsMiddleware('postId'),
  authMiddleware,
  validateBody(CommentDto),
  commentController.create,
);

postRouter.patch(
  '/:postId/comments/:id',
  integerParamsMiddleware(['postId', 'id']),
  authMiddleware,
  validateBody(CommentDto),
  commentController.update,
);

postRouter.delete(
  '/:postId/comments/:id',
  integerParamsMiddleware(['postId', 'id']),
  authMiddleware,
  commentController.delete,
);
