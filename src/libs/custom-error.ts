import { HttpStatus } from '../enums/http';

export class CustomError extends Error {
  status: HttpStatus;
  message: string;

  constructor(status: HttpStatus, message: string) {
    super(message);

    this.status = status;
    this.message = message;
  }
}
