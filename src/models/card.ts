import {model, Schema} from "mongoose";
import {ICard} from "../types/card";

const cardSchema = new Schema<ICard>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: {
    type: [{
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    }],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})

export default model<ICard>('card', cardSchema)
