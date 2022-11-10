import { Router } from 'express';
import {
  createCard, deleteCard, dislike, getCards, like,
} from '../controllers/cards';
import isCardValid from '../validators/card';
import { isCardIdValid } from '../validators';

const router = Router();

router.get('/', getCards);
router.post('/', isCardValid, createCard);
router.put('/:cardId/likes', isCardIdValid, like);
router.delete('/:cardId/likes', isCardIdValid, dislike);
router.delete('/:cardId', isCardIdValid, deleteCard);

export default router;
