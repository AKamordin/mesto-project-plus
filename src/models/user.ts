import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser, IUserModel } from '../types/user';
import { isURL, isEmail } from '../validators/user';
import {
  DEFAULT_USER_ABOUT,
  DEFAULT_USER_AVATAR,
  DEFAULT_USER_NAME,
  USER_NOT_AUTH,
} from '../constants';
import UnauthorizedError from '../errors/UnauthorizedError';

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Это обязательное поле'],
    minlength: [2, 'Поле должно содержать от 2 до 30 символов'],
    maxlength: [30, 'Поле должно содержать от 2 до 30 символов'],
    default: DEFAULT_USER_NAME,
  },
  about: {
    type: String,
    required: [true, 'Это обязательное поле'],
    minlength: [2, 'Поле должно содержать от 2 до 200 символов'],
    maxlength: [200, 'Поле должно содержать от 2 до 200 символов'],
    default: DEFAULT_USER_ABOUT,
  },
  avatar: {
    type: String,
    required: [true, 'Это обязательное поле'],
    validate: {
      validator: isURL,
      message: 'Некорректная ссылка',
    },
    default: DEFAULT_USER_AVATAR,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Это обязательное поле'],
    validate: {
      validator: isEmail,
      message: 'Некорректный e-mail',
    },
  },
  password: {
    type: String,
    required: [true, 'Это обязательное поле'],
    select: false,
  },
});

userSchema.static('findUserByCredentials', function findUserByCredentials(email: string, password: string) {
  return this.findOne({ email })
    .select('+password').then((user: IUser | null) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(USER_NOT_AUTH));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(USER_NOT_AUTH));
          }
          return user;
        });
    });
});

export default model<IUser, IUserModel>('user', userSchema);
