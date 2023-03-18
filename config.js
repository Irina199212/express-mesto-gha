require('dotenv').config();

const { JWT_SECRET = 'SECRET' } = process.env;
const { PORT = '3000' } = process.env;
const { DB = 'mongodb://localhost:27017/mestodb' } = process.env;

module.exports = {
  JWT_SECRET,
  PORT,
  DB,
};
