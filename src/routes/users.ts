import { Router } from 'express';
import {createUser, getUser, getUserById, getUsers, updateUser, updateUserAvatar} from "../controllers/users";

const router = Router()

router.get('/me', getUser);
router.get('/:userId', getUserById)
router.get('/', getUsers)
router.post('/', createUser)
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);

export default router
