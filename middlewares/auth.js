const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');
const BadRequiestError = require('../utils/errors/BadRequestError');

const {
  UNAUTHORIZED_ERROR,
  BAD_REQUEST_ERROR,
} = require('../utils/errors/errors');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new BadRequiestError(BAD_REQUEST_ERROR);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, config.jwtSecret);
  } catch (err) {
    next(new UnauthorizedError(UNAUTHORIZED_ERROR));
    return;
  }

  req.user = payload;

  next();
};

module.exports = auth;
