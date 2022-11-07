import { Router } from 'express';
import {createCard, deleteCard, dislike, getCards, like} from "../controllers/cards";

const router = Router();

router.get('/', getCards);
router.post('/', createCard);
router.put('/:cardId/likes', like);
router.delete('/:cardId/likes', dislike);
router.delete('/:cardId', deleteCard);

export default router;
