const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const isEmail = require('validator/lib/isEmail');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');
const BadRequestError = require('../utils/errors/BadRequestError');

const {
  CHECK_EMAIL_ERROR,
  USER_DOESNT_EXIST,
  BAD_REQUEST_ERROR,
} = require('../utils/errors/errors');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return isEmail(email);
      },
      message: CHECK_EMAIL_ERROR,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(USER_DOESNT_EXIST));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new BadRequestError(BAD_REQUEST_ERROR));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
