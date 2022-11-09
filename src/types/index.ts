import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface IError extends Error {
  statusCode: number;
  code?: number;
}

export interface IAuthRequest extends Request {
  user?: string | JwtPayload;
}

export interface ISessionRequest extends Request {
  user?: {
    _id: string
  }
}
