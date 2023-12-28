import { Router } from 'express';
import { validateBody } from '@/middlewares/body';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from '../user/user.repository';
import { RefreshTokenDto, SignInDto, SignUpDto } from './auth.dto';

const authService = new AuthService(new UserRepository());

const authController = new AuthController(authService);

export const authRouter = Router();

authRouter.post('/sign-up', validateBody(SignUpDto), authController.signUp);
authRouter.post('/sign-in', validateBody(SignInDto), authController.signIn);
authRouter.post(
  '/refresh',
  validateBody(RefreshTokenDto),
  authController.refreshToken,
);
