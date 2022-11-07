import { HTTP_STATUS_FORBIDDEN } from '../constants';

export default class ForbiddenError extends Error {
  private statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = HTTP_STATUS_FORBIDDEN;
  }
}
