import { celebrate, Joi } from 'celebrate';
import { CustomHelpers } from 'joi';
import { Types } from 'mongoose';

const validateId = (value: string, helper: CustomHelpers<string>) => {
  if (!Types.ObjectId.isValid(value)) {
    return helper.error('any.invalid');
  }
  return value;
};

export const isUserIdValid = celebrate({
  params: Joi.object({
    userId: Joi.string().required()
      .custom(validateId, 'objectId validation')
      .messages({
        'any.required': 'Это обязательный параметр',
        'any.invalid': 'Некорректное значение параметра userId',
      }),
  }),
});

export const isCardIdValid = celebrate({
  params: Joi.object({
    cardId: Joi.string().required()
      .custom(validateId, 'objectId validation')
      .messages({
        'any.required': 'Это обязательный параметр',
        'any.invalid': 'Некорректное значение параметра cardId',
      }),
  }),
});
