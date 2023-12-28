import { Router } from 'express';
import { authRouter } from './features/auth/auth.router';
import { postRouter } from './features/post/post.router';

export const router = Router();

router.use('/auth', authRouter);
router.use('/posts', postRouter);
