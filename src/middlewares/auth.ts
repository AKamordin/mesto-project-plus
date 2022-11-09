import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IAuthRequest } from '../types';
import UnauthorizedError from '../errors/UnauthorizedError';
import {
  TOKEN_INCORRECT,
  TOKEN_NOT_IN_HEADER,
  TOKEN_SECRET,
} from '../constants';

const extractBearerToken = (header: string) => header.replace('Bearer ', '');

const auth = (req: IAuthRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(TOKEN_NOT_IN_HEADER);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, TOKEN_SECRET);
  } catch (err) {
    throw new UnauthorizedError(TOKEN_INCORRECT);
  }

  req.user = payload;

  next();
};

export default auth;
