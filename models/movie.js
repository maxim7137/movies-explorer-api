const mongoose = require('mongoose');

const { Schema } = mongoose;

const movieValidator = require('validator');

const movieSchema = new Schema({
  country: {
    type: String,
    required: [true, '-Страна обязательна'],
  },
  director: {
    type: String,
    required: [true, '-Режиссёр обязателен'],
  },
  duration: {
    type: Number,
    required: [true, '-Длительность обязательна'],
  },
  year: {
    type: Number,
    required: [true, '-Год обязателен'],
  },
  description: {
    type: String,
    required: [true, '-Описание обязательно'],
  },
  image: {
    type: String,
    required: [true, '-Ссылка на постер обязательна'],
    validate: {
      // опишем свойство validate
      validator(v) {
        // validator - функция проверки данных. v - значение свойства age
        return movieValidator.isURL(v); // если нет, вернётся false
      },
      message:
        '-Ведите правильный URL для ссылки на постер, например: https://example.com', // когда validator вернёт false, будет использовано это сообщение
    },
  },
  trailerLink: {
    type: String,
    required: [true, '-Ссылка на трейлер обязательна'],
    validate: {
      validator(v) {
        return movieValidator.isURL(v);
      },
      message:
        '-Ведите правильный URL для ссылки на трейлер, например: https://example.com',
    },
  },
  thumbnail: {
    type: String,
    required: [true, '-Ссылка на миниатюрное изображение постера обязательна'],
    validate: {
      validator(v) {
        return movieValidator.isURL(v);
      },
      message:
        '-Ведите правильный URL для ссылки на трейлер, например: https://example.com',
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
    required: [true, '-id фильма обязателен (MoviesExplorer)'],
  },
  nameRU: {
    type: String,
    required: [true, '-название фильма на русском языке обязательно'],
  },
  nameEN: {
    type: String,
    required: [true, '-название фильма на английском языке обязательно'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
