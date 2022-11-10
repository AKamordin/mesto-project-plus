import { celebrate, Joi } from 'celebrate';
import { CARD_ERR_LINK, CARD_ERR_NAME, URL_PATTERN } from '../constants';
import validateId from './index';

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

export const isCardValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required()
      .min(2).max(20)
      .message(CARD_ERR_NAME),
    link: Joi.string().pattern(URL_PATTERN).message(CARD_ERR_LINK),
  }),
});
