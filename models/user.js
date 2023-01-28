const mongoose = require('mongoose');

const userValidator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, '-Пользователь с таким адресом уже зарегистрирован.'],
    required: [true, '-Почта обязательна.'],
    validate: {
      // опишем свойство validate
      validator(v) {
        // validator - функция проверки данных. v - значение свойства age
        return userValidator.isEmail(v); // если нет, вернётся false
      },
      message: '-Ведите почту, например: example@mail.com', // когда validator вернёт false, будет использовано это сообщение
    },
  },
  password: {
    type: String,
    required: [true, '-Пароль обязателен.'],
    select: false,
    minlength: [6, `-Минимальная длина пароля 6 символов`],
  },
  name: {
    type: String,
    required: [true, '-Имя обязательно.'],
    minlength: [2, `-Ведите имя от 2 до 30 символов, введено {VALUE}.`],
    maxlength: [30, `-Ведите имя от 2 до 30 символов, введено {VALUE}.`],
  }
});

module.exports = mongoose.model('user', userSchema);
