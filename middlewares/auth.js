const jwt = require('jsonwebtoken');
const Miss = require('../errors/miss');

const { JWT_SECRET } = require('../constants/devconstants');

module.exports.auth = (req, res, next) => {
  let payload; // объявляем переменную вне блока try catch
  const { authorization } = req.headers; // достаём авторизационный заголовок

  try {
    // убеждаемся, что он есть или начинается с Bearer
    if (!authorization || !authorization.startsWith('Bearer ')) {
      console.log(JWT_SECRET);
      throw new Miss('Необходима авторизация');
    } else {
      console.log(JWT_SECRET);
      const token = authorization.replace('Bearer ', ''); // извлечём токен
      payload = jwt.verify(token, JWT_SECRET); // верифицируем токен
    }
  } catch (error) {
    next(new Miss('Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};
