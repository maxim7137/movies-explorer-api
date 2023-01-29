const mongoose = require('mongoose');

const userValidator = require('validator');

const {
  conflictMessage,
  mailRequiredMessage,
  mailMessage,
  passwordRequiredMessage,
  minPasswordMessage,
  nameRequiredMessage,
  nameLengthMessage
} = require('../constants/messages');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, `-${conflictMessage}`],
    required: [true, `-${mailRequiredMessage}`],
    validate: {
      // опишем свойство validate
      validator(v) {
        // validator - функция проверки данных. v - значение
        return userValidator.isEmail(v); // если нет, вернётся false
      },
      message: `-${mailMessage}`, // когда validator вернёт false, будет использовано это сообщение
    },
  },
  password: {
    type: String,
    required: [true, `-${passwordRequiredMessage}`],
    select: false,
    minlength: [6, `-${minPasswordMessage}`],
  },
  name: {
    type: String,
    required: [true, `-${nameRequiredMessage}`],
    minlength: [2, `-${nameLengthMessage}`],
    maxlength: [30, `-${nameLengthMessage}`],
  },
});

module.exports = mongoose.model('user', userSchema);
