import { Router } from 'express';
import {
  createCard, deleteCard, dislike, getCards, like,
} from '../controllers/cards';
import { isCardIdValid, isCardValid } from '../validators/card';

const router = Router();

router.get('/', getCards);
router.post('/', isCardValid, createCard);
router.put('/:cardId/likes', isCardIdValid, like);
router.delete('/:cardId/likes', isCardIdValid, dislike);
router.delete('/:cardId', isCardIdValid, deleteCard);

export default router;
