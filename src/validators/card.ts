import { celebrate, Joi } from 'celebrate';
import { CARD_ERR_LINK, CARD_ERR_NAME, URL_PATTERN } from '../constants';

const isCardValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required()
      .min(2).max(20)
      .message(CARD_ERR_NAME),
    link: Joi.string().pattern(URL_PATTERN).message(CARD_ERR_LINK),
  }),
});

export default isCardValid;
