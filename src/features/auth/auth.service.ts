import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from '@/libs/token';
import { TokenResponse } from '@/types/auth';
import { RefreshTokenDto, SignInDto, SignUpDto } from './auth.dto';
import { CustomError } from '../../libs/custom-error';
import { HttpStatus } from '../../enums/http';
import { UserRepository } from '../user/user.repository';
import { TokenRepository } from '../token/token.repository';

export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const user = await this.userRepository.findOneByEmail(signUpDto.email);

    if (user !== null) {
      throw new CustomError(HttpStatus.CONFLICT, '이미 사용중인 이메일');
    }

    await this.userRepository.create(signUpDto);
  }

  async signIn(signInDto: SignInDto): Promise<TokenResponse> {
    const { email, password } = signInDto;

    const user = await this.userRepository.findOneByEmailAndPassword(
      email,
      password,
    );

    if (user === null) {
      throw new CustomError(HttpStatus.NOT_FOUND, '존재하지 않는 사용자');
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await this.tokenRepository.create(refreshToken, user.id);

    return {
      accessToken,
      refreshToken,
    };
  }

  refreshToken = async (
    refreshTokenDto: RefreshTokenDto,
  ): Promise<TokenResponse> => {
    const { refreshToken } = refreshTokenDto;

    const existToken = await this.tokenRepository.findOneByToken(refreshToken);

    if (existToken === null) {
      throw new CustomError(
        HttpStatus.UN_AUTHORIZATION,
        '올바르지 않은 리프레쉬 토큰',
      );
    }

    const decodedToken = await verifyToken(refreshToken, {
      onExpired: async () => {
        await this.tokenRepository.delete(existToken.id);
      },
    });

    const user = await this.userRepository.findOneById(decodedToken.id);

    if (user === null) {
      throw new CustomError(HttpStatus.NOT_FOUND, '존재하지 않는 사용자');
    }

    const newAccessToken = generateAccessToken(user.id);
    const newRefreshToken = generateRefreshToken(user.id);

    await this.tokenRepository.update(existToken.id, newRefreshToken);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  };
}
