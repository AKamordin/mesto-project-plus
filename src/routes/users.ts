import { Router } from 'express';
import {
  getUser, getUserById, getUsers, updateUser, updateUserAvatar,
} from '../controllers/users';
import { isUserIdValid } from '../validators';
import { isUserAvatarValid, isUserValid } from '../validators/user';

const router = Router();

router.get('/me', getUser);
router.get('/:userId', isUserIdValid, getUserById);
router.get('/', getUsers);
router.patch('/me', isUserValid, updateUser);
router.patch('/me/avatar', isUserAvatarValid, updateUserAvatar);

export default router;
