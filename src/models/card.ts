import { model, Schema } from 'mongoose';
import { ICard } from '../types/card';

const cardSchema = new Schema<ICard>({
  name: {
    type: String,
    required: [true, 'Это обязательное поле'],
    minlength: [2, 'Поле должно содержать от 2 до 20 символов'],
    maxlength: [20, 'Поле должно содержать от 2 до 20 символов'],
  },
  link: {
    type: String,
    required: [true, 'Это обязательное поле'],
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: [true, 'Это обязательное поле'],
    ref: 'user',
  },
  likes: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'user',
    }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default model<ICard>('card', cardSchema);
