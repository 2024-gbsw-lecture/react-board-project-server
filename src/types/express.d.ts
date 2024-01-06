import { Post, User } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user: User;
      post: Post;
    }
  }
}
