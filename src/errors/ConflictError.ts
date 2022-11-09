import { HTTP_STATUS_CONFLICT } from '../constants';

export default class ConflictError extends Error {
  private statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = HTTP_STATUS_CONFLICT;
  }
}
