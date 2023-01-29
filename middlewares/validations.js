const { celebrate, Joi } = require('celebrate');
const preValidator = require('validator');
const { isValidObjectId } = require('mongoose');

module.exports.validateRegUser = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (preValidator.isEmail(value)) {
            return value;
          }
          return helpers.message(
            'Ведите почту, например: example@mail.com, Joi-custom'
          );
        })
        .messages({
          'any.required': 'Почта обязательна, Joi',
          'string.custom':
            'Ведите почту, например: example@mail.com, Joi-messages',
        }),
      password: Joi.string().min(6).required().messages({
        'string.min': 'Пароль не менее 6 символов, Joi',
        'any.required': 'Пароль обязателен, Joi',
      }),
      name: Joi.string().min(2).max(30).required()
        .messages({
          'string.min': 'Имя от 2 до 30 символов, Joi',
          'string.max': 'Имя от 2 до 30 символов, Joi',
          'any.required': 'Имя обязательно, Joi',
        }),
    })
    .unknown(),
});

module.exports.validateLoginUser = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (preValidator.isEmail(value)) {
            return value;
          }
          return helpers.message(
            'Ведите почту, например: example@mail.com, Joi-custom'
          );
        })
        .messages({
          'any.required': 'Почта обязательна, Joi',
          'string.custom':
            'Ведите почту, например: example@mail.com, Joi-messages',
        }),
      password: Joi.string().min(6).required().messages({
        'string.min': 'Пароль не менее 6 символов, Joi',
        'any.required': 'Пароль обязателен, Joi',
      }),
    })
    .unknown(),
});

module.exports.validateUpdateUser = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (preValidator.isEmail(value)) {
            return value;
          }
          return helpers.message(
            'Ведите почту, например: example@mail.com, Joi-custom'
          );
        })
        .messages({
          'any.required': 'Почта обязательна, Joi',
          'string.custom':
            'Ведите почту, например: example@mail.com, Joi-messages',
        }),
      name: Joi.string().min(2).max(30).messages({
        'string.min': 'Имя от 2 до 30 символов, Joi',
        'string.max': 'Имя от 2 до 30 символов, Joi',
      }),
    })
    .unknown(),
});

module.exports.validateMovieId = celebrate({
  params: Joi.object()
    .keys({
      movieId: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (isValidObjectId(value)) {
            return value;
          }
          return helpers.message('Id не из этой базы данных, Joi-custom');
        })
        .messages({
          'any.required': 'Необходимо указать id фильма, Joi',
        }),
    })
    .unknown(),
});

module.exports.validateMovieCreate = celebrate({
  body: Joi.object()
    .keys({
      country: Joi.string().required().messages({
        'any.required': 'Страна обязательна, Joi',
      }),
      director: Joi.string().required().messages({
        'any.required': 'Режиссёр обязателен, Joi',
      }),
      duration: Joi.number().required().messages({
        'any.required': 'Длительность обязательна, Joi',
      }),
      year: Joi.number().required().messages({
        'any.required': 'Год обязателен, Joi',
      }),
      description: Joi.string().required().messages({
        'any.required': 'Описание обязательно, Joi',
      }),
      image: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (preValidator.isURL(value)) {
            return value;
          }
          return helpers.message(
            'Ведите ссылку на постер, например: https://example.com/image.jpg, Joi-helpers'
          );
        })
        .messages({
          'any.required': 'Ссылка на постер обязательна, Joi',
          'string.custom':
            'Ведите ссылку на постер, например: https://example.com/image.jpg, Joi-messages',
        }),
      trailerLink: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (preValidator.isURL(value)) {
            return value;
          }
          return helpers.message(
            'Ведите ссылку на трейлер, например: https://example.com/image.jpg, Joi-helpers'
          );
        })
        .messages({
          'any.required': 'Ссылка на трейлер обязательна, Joi',
          'string.custom':
            'Ведите ссылку на трейлер, например: https://example.com/image.jpg, Joi-messages',
        }),
      thumbnail: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (preValidator.isURL(value)) {
            return value;
          }
          return helpers.message(
            'Ведите ссылку на миниатюрное изображение, например: https://example.com/image.jpg, Joi-helpers'
          );
        })
        .messages({
          'any.required': 'Ссылка на миниатюрное изображение, Joi',
          'string.custom':
            'Ведите ссылку на миниатюрное изображение, например: https://example.com/image.jpg, Joi-messages',
        }),
      owner: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (isValidObjectId(value)) {
            return value;
          }
          return helpers.message('Id не из этой базы данных, Joi-custom');
        })
        .messages({
          'any.required': 'Необходимо указать id фильма, Joi',
        }),
      movieId: Joi.string().required().messages({
        'any.required': 'id фильма обязателен, Joi',
      }),
      nameRU: Joi.string().required().messages({
        'any.required': 'название фильма на русском языке обязательно, Joi',
      }),
      nameEN: Joi.string().required().messages({
        'any.required': 'название фильма на английском языке обязательно, Joi',
      }),
    })
    .unknown(),
});
