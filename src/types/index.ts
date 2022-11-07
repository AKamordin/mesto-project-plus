import {Request} from "express";

export interface IError extends Error {
  statusCode: number;
  code?: number;
}

export interface IAuthRequest extends Request {
  user?: {
    _id: string
  }
}
