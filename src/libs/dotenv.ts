import { config } from 'dotenv';
import { z } from 'zod';

config();

export const dotenv = {
  DATABASE_URL: process.env.DATABASE_URL as string,

  SERVER_PORT: Number(process.env.SERVER_PORT),

  ACCESS_TOKEN_EXPIRES: Number(process.env.ACCESS_TOKEN_EXPIRES),
  REFRESH_TOKEN_EXPIRES: Number(process.env.REFRESH_TOKEN_EXPIRES),

  JWT_SECRET: process.env.JWT_SECRET as string,
} as const;

export const dotenvSchema = z
  .object({
    DATABASE_URL: z.string().min(1, '데이터베이스 경로를 입력해주세요.'),

    SERVER_PORT: z.number().int().min(1, '서버 포트번호를 입력해주세요'),

    ACCESS_TOKEN_EXPIRES: z
      .number()
      .int()
      .min(1, 'Access Token 만료시간(초)를 입력해주세요.'),
    REFRESH_TOKEN_EXPIRES: z
      .number()
      .min(1, 'Refresh Token 만료시간(초)를 입력해주세요.'),

    JWT_SECRET: z.string().min(1, 'JWT SECRETS 값을 입력해주세요.'),
  })
  .superRefine(
    ({ ACCESS_TOKEN_EXPIRES, REFRESH_TOKEN_EXPIRES }, { addIssue }) => {
      if (ACCESS_TOKEN_EXPIRES >= REFRESH_TOKEN_EXPIRES) {
        addIssue({
          code: z.ZodIssueCode.custom,
          message:
            'Access Token 만료시간이 Refresh Token 만료시간보다 크거나 같을 수 없습니다.',
        });
      }
    },
  );
