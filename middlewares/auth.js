const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const TokenError = require('../errors/token');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new TokenError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new TokenError('Необходима авторизация');
  }

  req.user = payload;
  next();
};

module.exports = auth;
