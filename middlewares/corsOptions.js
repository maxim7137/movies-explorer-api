const { corsMessage } = require('../constants/messages');

const whiteList = [
  'https://localhost:3000',
  'http://localhost:3000',
  'localhost:3000',
  'https://127.0.0.1:3000',
  'http://127.0.0.1:3000',
  '127.0.0.1:3000',
  'https://localhost',
  'http://localhost',
  'localhost',
  'https://127.0.0.1',
  'http://127.0.0.1',
  '127.0.0.1',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error(corsMessage));
    }
  },
};

module.exports = corsOptions;
