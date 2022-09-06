const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const {
  CHECK_EMAIL_ERROR,
  CHECK_PASSWORD_ERROR,
  NOT_FOUND_URL,
} = require('../utils/errors/errors');

const userValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required().messages({
      'string.empty': CHECK_EMAIL_ERROR,
    }),
    password: Joi.string().required().messages({
      'string.empty': CHECK_PASSWORD_ERROR,
    }),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required().messages({
      'string.empty': CHECK_EMAIL_ERROR,
    }),
    password: Joi.string().required().messages({
      'string.empty': CHECK_PASSWORD_ERROR,
    }),
  }),
});

const userIdValidation = celebrate({
  body: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

const profileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required().messages({
      'string.empty': CHECK_EMAIL_ERROR,
    }),
  }),
});

const movieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(NOT_FOUND_URL);
    }),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(NOT_FOUND_URL);
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(NOT_FOUND_URL);
    }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  userValidation,
  movieValidation,
  loginValidation,
  profileValidation,
  userIdValidation,
  movieIdValidation,
};
