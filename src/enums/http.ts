export const HttpStatus = {
  OK: 200,
  INVALID: 400,
  UN_AUTHORIZATION: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  NOT_ALLOW: 405,
  CONFLICT: 409,
  SERVER_ERROR: 500,
} as const;

export type HttpStatus = (typeof HttpStatus)[keyof typeof HttpStatus];
