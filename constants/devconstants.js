require('dotenv').config();

const { JWT_SECRET = 'dev-key', DB = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

module.exports = { JWT_SECRET, DB };
