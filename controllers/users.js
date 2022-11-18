const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../utils/errors/NotFoundError'); //  404
const BadRequestError = require('../utils/errors/BadRequestError'); //  400
const ConflictError = require('../utils/errors/ConflictError'); // 409

const config = require('../utils/config');

const {
  NOT_FOUND_USER_ID,
  BAD_REQUEST_ERROR,
  CONFLICT_ERROR,
  VALIDATION_ERROR,
} = require('../utils/errors/errors');

module.exports.getUser = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .orFail(new NotFoundError(NOT_FOUND_USER_ID))
    .then((user) => {
      res.status(200).send({ name: user.name, email: user.email });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email } = req.body;
  const hash = bcrypt.hashSync(req.body.password, 10);
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError(CONFLICT_ERROR);
      }
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      })
        .then((newUser) => res.status(201).send({
          name: newUser.name,
          email: newUser.email,
        }))
        .catch((err) => {
          if (err.name === VALIDATION_ERROR) {
            next(new BadRequestError(BAD_REQUEST_ERROR));
            return;
          }
          next(err);
        });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, config.jwtSecret, { expiresIn: 604800 });
      res.status(200).send({ token, message: 'Аутентификация прошла успешно' });
    })
    .catch(next);
};

module.exports.patchProfile = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;
  User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_USER_ID);
      }
      res.status(200).send({ name: user.name, email: user.email });
    })
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequestError(BAD_REQUEST_ERROR));
        return;
      }
      if (err.code === 11000) {
        next(new ConflictError(CONFLICT_ERROR));
        return;
      }
      next(err);
    });
};
