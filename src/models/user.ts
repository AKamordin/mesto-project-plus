import { model, Schema } from 'mongoose';
import { IUser } from '../types/user';

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Это обязательное поле'],
    minlength: [2, 'Поле должно содержать от 2 до 30 символов'],
    maxlength: [30, 'Поле должно содержать от 2 до 30 символов'],
  },
  about: {
    type: String,
    required: [true, 'Это обязательное поле'],
    minlength: [2, 'Поле должно содержать от 2 до 200 символов'],
    maxlength: [200, 'Поле должно содержать от 2 до 200 символов'],
  },
  avatar: {
    type: String,
    required: [true, 'Это обязательное поле'],
  },
});

export default model<IUser>('user', userSchema);
