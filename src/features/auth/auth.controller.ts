import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '@/enums/http';
import { RefreshTokenDto, SignInDto, SignUpDto } from './auth.dto';
import { AuthService } from './auth.service';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  signUp = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const signUpDto = request.body as SignUpDto;

      await this.authService.signUp(signUpDto);

      response.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'success',
      });
    } catch (error) {
      next(error);
    }
  };

  signIn = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const signInDto = request.body as SignInDto;

      const tokenResponse = await this.authService.signIn(signInDto);

      response.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'success',
        data: tokenResponse,
      });
    } catch (error) {
      next(error);
    }
  };

  refreshToken = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const refreshTokenDto = request.body as RefreshTokenDto;

      const tokenResponse = await this.authService.refreshToken(
        refreshTokenDto,
      );

      response.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'success',
        data: tokenResponse,
      });
    } catch (error) {
      next(error);
    }
  };
}
