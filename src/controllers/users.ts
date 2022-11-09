import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user';
import NotFoundError from '../errors/NotFoundError';
import BadRequestError from '../errors/BadRequestError';
import { ISessionRequest } from '../types';
import {
  CAST_ERROR,
  CONFLICT_ERROR_CODE, TOKEN_LIFE_TIME,
  TOKEN_SECRET,
  USER_DUP_EMAIL,
  USER_NOT_FOUND,
  VALIDATION_ERROR,
} from '../constants';
import ConflictError from '../errors/ConflictError';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  const { JWT_SECRET = TOKEN_SECRET } = process.env;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
      token: jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: TOKEN_LIFE_TIME }),
    }))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequestError(err.message));
      } else if (err.code === CONFLICT_ERROR_CODE) {
        next(new ConflictError(USER_DUP_EMAIL));
      } else {
        next(err);
      }
    });
};

export const getUser = (req: ISessionRequest, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  User.findById(userId)
    .orFail(() => new NotFoundError(USER_NOT_FOUND))
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        next(new NotFoundError(USER_NOT_FOUND));
      } if (err.name === VALIDATION_ERROR) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const { JWT_SECRET = TOKEN_SECRET } = process.env;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: TOKEN_LIFE_TIME }),
      });
    })
    .catch(next);
};

export const updateUser = (req: ISessionRequest, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  User.findByIdAndUpdate(userId, req.body, { new: true, runValidators: true })
    .orFail(() => new NotFoundError(USER_NOT_FOUND))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

export const updateUserAvatar = (req: ISessionRequest, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { ...req.body, avatar }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError(USER_NOT_FOUND))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};
