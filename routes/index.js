const express = require('express');

const router = express.Router();

const auth = require('../middlewares/auth');
const { userValidation, loginValidation } = require('../middlewares/validation');
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../utils/errors/NotFoundError');
const NOT_FOUND_ERROR = require('../utils/errors/errors');

const movieRouter = require('./movies');
const userRouter = require('./users');

router.post('/signup', userValidation, createUser);
router.post('/signin', loginValidation, login);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('/*', () => {
  throw new NotFoundError(NOT_FOUND_ERROR);
});

module.exports = router;
