import { HTTP_STATUS_UNAUTHORIZED } from '../constants';

export default class UnauthorizedError extends Error {
  private statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = HTTP_STATUS_UNAUTHORIZED;
  }
}
