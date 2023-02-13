const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/notFound');
const Miss = require('../errors/miss');
const Conflict = require('../errors/conflict');
const BadRequest = require('../errors/badRequest');

const { JWT_SECRET } = require('../constants/devconstants');
const {
  noUserMessage,
  wrongIdMessage,
  conflictMessage,
  missMessage,
} = require('../constants/messages');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError(noUserMessage))
    .then((user) => {
      res.send({ email: user.email, name: user.name });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequest(wrongIdMessage));
      } else {
        next(error);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) =>
      res.send({
        email: user.email,
        name: user.name,
        _id: user._id,
        __v: user.__v,
      }))
    .catch((error) => {
      if (error.code === 11000) {
        next(new Conflict(conflictMessage));
      } else if (error.name === 'ValidationError') {
        next(new BadRequest(`${error.message.split('-')[1]}`));
      } else {
        next(error);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true }
  )
    .orFail(new NotFoundError(noUserMessage))
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      if (error.code === 11000) {
        next(new Conflict(conflictMessage));
      } else if (error.name === 'CastError') {
        next(new BadRequest(wrongIdMessage));
      } else if (error.name === 'ValidationError') {
        next(new BadRequest(`${error.message.split('-')[1]}`));
      } else {
        next(error);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new Miss(missMessage);
      }
      return bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Miss(missMessage);
          }
          return user;
        })
        .then(() => {
          // создадим токен
          const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
            expiresIn: '7d',
          });
          // вернём токен
          res.send({ token });
        })
        .catch(next);
    })
    .catch(next);
};
