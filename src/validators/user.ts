import validator from 'validator';
import { celebrate, Joi } from 'celebrate';
import {
  URL_PATTERN, USER_ERR_ABOUT,
  USER_ERR_AVATAR,
  USER_ERR_EMAIL, USER_ERR_EMAIL_EMPTY, USER_ERR_NAME,
  USER_ERR_PASSWORD_EMPTY, USER_ERR_PASSWORD_LEN,
} from '../constants';

export const isURL = (url: string): boolean => URL_PATTERN.test(url);

export const isEmail = (email: string): boolean => validator.isEmail(email);

export const isUserValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).message(USER_ERR_NAME),
    avatar: Joi.string().pattern(URL_PATTERN).message(USER_ERR_AVATAR),
    about: Joi.string().min(2).max(200).message(USER_ERR_ABOUT),
  }),
});

export const isUserAvatarValid = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(URL_PATTERN).message(USER_ERR_AVATAR),
  }),
});

export const isSignUpRequestValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).message(USER_ERR_NAME),
    about: Joi.string().min(2).max(200).message(USER_ERR_ABOUT),
    avatar: Joi.string().pattern(URL_PATTERN).message(USER_ERR_AVATAR),
    email: Joi.string().required().email().messages({
      'any.required': USER_ERR_EMAIL_EMPTY,
      'string.email': USER_ERR_EMAIL,
    }),
    password: Joi.string().required().min(6).messages({
      'any.required': USER_ERR_PASSWORD_EMPTY,
      'string.min': USER_ERR_PASSWORD_LEN,
    }),
  }),
});

export const isSignInRequestValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'any.required': USER_ERR_EMAIL_EMPTY,
      'string.email': USER_ERR_EMAIL,
    }),
    password: Joi.string().required().min(6).messages({
      'any.required': USER_ERR_PASSWORD_EMPTY,
      'string.min': USER_ERR_PASSWORD_LEN,
    }),
  }),
});
