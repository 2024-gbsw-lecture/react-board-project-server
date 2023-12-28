import { config } from 'dotenv';

config();

export const dotenv = {
  DATABASE_URL: process.env.DATABASE_URL as string,

  SERVER_PORT: Number(process.env.SERVER_PORT),

  ACCESS_TOKEN_EXPIRES: Number(process.env.ACCESS_TOKEN_EXPIRES),
  REFRESH_TOKEN_EXPIRES: Number(process.env.REFRESH_TOKEN_EXPIRES),

  JWT_SECRET: process.env.JWT_SECRET as string,
} as const;
