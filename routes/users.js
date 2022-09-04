const experss = require('express');

const {
  getUser,
  patchProfile,
} = require('../controllers/users');

const userRouter = experss.Router();

const {
  userIdValidation,
  profileValidation,
} = require('../middlewares/validation');

userRouter.get('/me', userIdValidation, getUser);
userRouter.patch('/me', profileValidation, patchProfile);

module.exports = userRouter;
