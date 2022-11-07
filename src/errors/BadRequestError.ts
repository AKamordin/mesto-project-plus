import {HTTP_STATUS_BAD_REQUEST} from "../constants";

export default class BadRequestError extends Error {
  private statusCode: number;
  constructor(message: string) {
    super(message)
    this.statusCode = HTTP_STATUS_BAD_REQUEST
  }
}
