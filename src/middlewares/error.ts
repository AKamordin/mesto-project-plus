import { Request, Response } from 'express';
import { HTTP_STATUS_SERVER_ERROR } from '../constants';
import { IError } from '../types';

const error = (err: IError, req: Request, res: Response) => {
  const { statusCode = HTTP_STATUS_SERVER_ERROR, message } = err;
  res.status(statusCode).send({ message: statusCode === HTTP_STATUS_SERVER_ERROR ? 'На сервере произошла ошибка' : message });
};

export default error;
