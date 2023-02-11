const mongoose = require('mongoose');

const { Schema } = mongoose;

const movieValidator = require('validator');

const {
  countryRequiredMessage,
  directorRequiredMessage,
  durationRequiredMessage,
  yearRequiredMessage,
  descriptionRequiredMessage,
  linkRequiredMessage,
  wrongLinkMessage,
  requiredIdMessage,
  nameENRequiredMessage,
  nameRURequiredMessage,
} = require('../constants/messages');

const movieSchema = new Schema({
  country: {
    type: String,
    required: [true, `-${countryRequiredMessage}`],
  },
  director: {
    type: String,
    required: [true, `-${directorRequiredMessage}`],
  },
  duration: {
    type: Number,
    required: [true, `-${durationRequiredMessage}`],
  },
  year: {
    type: Number,
    required: [true, `-${yearRequiredMessage}`],
  },
  description: {
    type: String,
    required: [true, `-${descriptionRequiredMessage}`],
  },
  image: {
    type: String,
    required: [true, `-${linkRequiredMessage}`],
    validate: {
      // опишем свойство validate
      validator(v) {
        // validator - функция проверки данных. v - значение свойства age
        return movieValidator.isURL(v); // если нет, вернётся false
      },
      message: `-${wrongLinkMessage}`,
    },
  },
  trailerLink: {
    type: String,
    required: [true, `-${linkRequiredMessage}`],
    validate: {
      validator(v) {
        return movieValidator.isURL(v);
      },
      message: `-${wrongLinkMessage}`,
    },
  },
  thumbnail: {
    type: String,
    required: [true, `-${linkRequiredMessage}`],
    validate: {
      validator(v) {
        return movieValidator.isURL(v);
      },
      message: `-${wrongLinkMessage}`,
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: [true, `-${requiredIdMessage}`],
  },
  nameRU: {
    type: String,
    required: [true, `-${nameRURequiredMessage}`],
  },
  nameEN: {
    type: String,
    required: [true, `-${nameENRequiredMessage}`],
  },
});

module.exports = mongoose.model('movie', movieSchema);
