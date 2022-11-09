import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import NotFoundError from '../errors/NotFoundError';

const isIdValid = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (Types.ObjectId.isValid(id)) {
    next(new NotFoundError('Некорректный ID'));
  } else {
    next();
  }
};

export default isIdValid;
