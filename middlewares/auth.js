const jwt = require('jsonwebtoken');
const Miss = require('../errors/miss');

const { JWT_SECRET } = require('../constants/devconstants');
const { authMessage } = require('../constants/messages');

module.exports.auth = (req, res, next) => {
  let payload; // объявляем переменную вне блока try catch
  const { authorization } = req.headers; // достаём авторизационный заголовок

  try {
    // убеждаемся, что он есть или начинается с Bearer
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new Miss(authMessage);
    } else {
      const token = authorization.replace('Bearer ', ''); // извлечём токен
      payload = jwt.verify(token, JWT_SECRET); // верифицируем токен
    }
  } catch (error) {
    next(new Miss(authMessage));
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};
