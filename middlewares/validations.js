const { celebrate, Joi } = require('celebrate');
const preValidator = require('validator');
const { isValidObjectId } = require('mongoose');
const {
  mailMessage,
  mailRequiredMessage,
  minPasswordMessage,
  passwordRequiredMessage,
  nameLengthMessage,
  nameRequiredMessage,
  wrongIdMessage,
  requiredIdMessage,
  countryRequiredMessage,
  directorRequiredMessage,
  durationRequiredMessage,
  yearRequiredMessage,
  descriptionRequiredMessage,
  wrongLinkMessage,
  linkRequiredMessage,
  nameRURequiredMessage,
  nameENRequiredMessage,
} = require('../constants/messages');

module.exports.validateRegUser = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (preValidator.isEmail(value)) {
            return value;
          }
          return helpers.message(mailMessage);
        })
        .messages({
          'any.required': mailRequiredMessage,
          'string.empty': mailRequiredMessage,
          'string.custom': mailMessage,
        }),
      password: Joi.string().min(6).required().messages({
        'string.min': minPasswordMessage,
        'any.required': passwordRequiredMessage,
        'string.empty': passwordRequiredMessage,
      }),
      name: Joi.string().min(2).max(30).required()
        .messages({
          'string.min': nameLengthMessage,
          'string.max': nameLengthMessage,
          'any.required': nameRequiredMessage,
          'string.empty': nameRequiredMessage,
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
          return helpers.message(mailMessage);
        })
        .messages({
          'any.required': mailRequiredMessage,
          'string.empty': mailRequiredMessage,
          'string.custom': mailMessage,
        }),
      password: Joi.string().min(6).required().messages({
        'string.min': minPasswordMessage,
        'any.required': passwordRequiredMessage,
        'string.empty': passwordRequiredMessage,
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
          return helpers.message(mailMessage);
        })
        .messages({
          'any.required': mailRequiredMessage,
          'string.empty': mailRequiredMessage,
          'string.custom': mailMessage,
        }),
      name: Joi.string().min(2).max(30).required()
        .messages({
          'string.min': nameLengthMessage,
          'string.max': nameLengthMessage,
          'any.required': nameRequiredMessage,
          'string.empty': nameRequiredMessage,
        }),
    })
    .unknown(),
});

module.exports.validateMovieId = celebrate({
  params: Joi.object()
    .keys({
      movieId: Joi.number()
        .required()
        .custom((value, helpers) => {
          if (isValidObjectId(value)) {
            return value;
          }
          return helpers.message(wrongIdMessage);
        })
        .messages({
          'any.required': requiredIdMessage,
          'string.empty': requiredIdMessage,
        }),
    })
    .unknown(),
});

module.exports.validateMovieCreate = celebrate({
  body: Joi.object()
    .keys({
      country: Joi.string().required().messages({
        'any.required': countryRequiredMessage,
        'string.empty': countryRequiredMessage,
      }),
      director: Joi.string().required().messages({
        'any.required': directorRequiredMessage,
        'string.empty': directorRequiredMessage,
      }),
      duration: Joi.number().required().messages({
        'any.required': durationRequiredMessage,
        'string.empty': durationRequiredMessage,
      }),
      year: Joi.number().required().messages({
        'any.required': yearRequiredMessage,
        'string.empty': yearRequiredMessage,
      }),
      description: Joi.string().required().messages({
        'any.required': descriptionRequiredMessage,
        'string.empty': descriptionRequiredMessage,
      }),
      image: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (preValidator.isURL(value)) {
            return value;
          }
          return helpers.message(wrongLinkMessage);
        })
        .messages({
          'any.required': linkRequiredMessage,
          'string.empty': linkRequiredMessage,
          'string.custom': wrongLinkMessage,
        }),
      trailerLink: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (preValidator.isURL(value)) {
            return value;
          }
          return helpers.message(wrongLinkMessage);
        })
        .messages({
          'any.required': linkRequiredMessage,
          'string.empty': linkRequiredMessage,
          'string.custom': wrongLinkMessage,
        }),
      thumbnail: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (preValidator.isURL(value)) {
            return value;
          }
          return helpers.message(wrongLinkMessage);
        })
        .messages({
          'any.required': linkRequiredMessage,
          'string.empty': linkRequiredMessage,
          'string.custom': wrongLinkMessage,
        }),
      owner: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (isValidObjectId(value)) {
            return value;
          }
          return helpers.message(wrongIdMessage);
        })
        .messages({
          'any.required': requiredIdMessage,
          'string.empty': requiredIdMessage,
        }),
      movieId: Joi.number().required().messages({
        'any.required': requiredIdMessage,
        'string.empty': requiredIdMessage,
      }),
      nameRU: Joi.string().required().messages({
        'any.required': nameRURequiredMessage,
        'string.empty': nameRURequiredMessage,
      }),
      nameEN: Joi.string().required().messages({
        'any.required': nameENRequiredMessage,
        'string.empty': nameENRequiredMessage,
      }),
    })
    .unknown(),
});
