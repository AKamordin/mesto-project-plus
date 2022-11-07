import User from "../models/user";
import {Request, Response, NextFunction} from "express";
import NotFoundError from "../errors/NotFoundError";
import BadRequestError from "../errors/BadRequestError";
import {IAuthRequest} from "../types";
import {USER_NOT_FOUND, VALIDATION_ERROR} from "../constants";

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then(users => res.send(users))
    .catch(next)
}

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND)
      }
      res.send(user)
    })
    .catch(next)
}

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {name, about, avatar} = req.body
  User.create({name, about, avatar})
    .then(user => res.send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    }))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequestError(err.message))
      } else {
        next(err)
      }
    })
}

export const getUser = (req: IAuthRequest, res: Response, next: NextFunction) => {
  const userId = req.user?._id
  User.findById(userId)
    .then(user => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND)
      }
      res.send(user)
    })
    .catch(next)
}

export const updateUser = (req: IAuthRequest, res: Response, next: NextFunction) => {
  const userId = req.user?._id
  User.findByIdAndUpdate(userId, req.body, {new: true})
    .orFail(() => new NotFoundError(USER_NOT_FOUND))
    .then(user => res.send(user))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequestError(err.message))
      } else {
        next(err)
      }
    })
}

export const updateUserAvatar = (req: IAuthRequest, res: Response, next: NextFunction) => {
  const userId = req.user?._id
  const {avatar} = req.body
  User.findByIdAndUpdate(userId, {...req.body, avatar: avatar}, {new: true})
    .orFail(() => new NotFoundError(USER_NOT_FOUND))
    .then(user => res.send(user))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequestError(err.message))
      } else {
        next(err)
      }
    })
}
