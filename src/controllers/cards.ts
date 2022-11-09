import { Request, Response, NextFunction } from 'express';
import Card from '../models/card';
import { ISessionRequest } from '../types';
import BadRequestError from '../errors/BadRequestError';
import {
  CARD_DELETE_FORBIDDEN,
  CARD_DELETED,
  CARD_NOT_FOUND,
  CAST_ERROR,
  HTTP_STATUS_CREATED,
  VALIDATION_ERROR,
} from '../constants';
import NotFoundError from '../errors/NotFoundError';
import ForbiddenError from '../errors/ForbiddenError';

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

export const createCard = (req: ISessionRequest, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  Card.create({ ...req.body, owner: userId })
    .then((card) => res.status(HTTP_STATUS_CREATED).send(card))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

export const deleteCard = (req: ISessionRequest, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(CARD_NOT_FOUND);
      }
      if (card.owner.toString() !== userId) {
        throw new ForbiddenError(CARD_DELETE_FORBIDDEN);
      }
      return Card.findByIdAndDelete(cardId);
    })
    .then(() => res.send({ message: CARD_DELETED }))
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

export const like = (req: ISessionRequest, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(CARD_NOT_FOUND);
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

export const dislike = (req: ISessionRequest, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(CARD_NOT_FOUND);
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};
