import {HTTP_STATUS_NOT_FOUND} from "../constants";

export default class NotFoundError extends Error {
  private statusCode: number;
  constructor(message: string) {
    super(message)
    this.statusCode = HTTP_STATUS_NOT_FOUND
  }
}
