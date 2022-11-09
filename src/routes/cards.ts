import { Router } from 'express';
import {
  createCard, deleteCard, dislike, getCards, like,
} from '../controllers/cards';
import isCardValid from '../validators/card';
import isIdValid from '../validators';

const router = Router();

router.get('/', getCards);
router.post('/', isCardValid, createCard);
router.put('/:cardId/likes', isIdValid, like);
router.delete('/:cardId/likes', isIdValid, dislike);
router.delete('/:cardId', isIdValid, deleteCard);

export default router;
