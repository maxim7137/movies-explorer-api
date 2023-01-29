require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');

const { errors } = require('celebrate');
const { limiter } = require('./middlewares/limiter');
const { errorHandler } = require('./middlewares/errorHandler'); // импорт обработчика ошибок
const { requestLogger, errorLogger } = require('./middlewares/logger'); // импорт логгеров

const router = require('./routes'); // импорт роутов

const { DB = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

const app = express();

const whiteList = [
  'https://localhost:3000',
  'http://localhost:3000',
  'localhost:3000',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions)); // мидлвер для cors

mongoose.set('strictQuery', false);
mongoose.connect(DB);

app.use(limiter); // мидлвер для ограничения кол-во запросов. Для защиты от DoS-атак.
app.use(helmet()); // мидлвер для для простановки security-заголовков, защ. от нек. уязвим.
app.use(express.json()); // мидлвер для body

app.use(requestLogger); // подключаем мидлвер логгер запросов
app.use(router); // единый роут подключается в файле app.js
app.use(errorLogger); // подключаем логгер ошибок

// здесь обрабатываем все ошибки
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler); // свой централизованный обработчик ошибок

module.exports = { app, DB };
