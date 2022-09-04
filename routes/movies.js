const express = require('express');

const {
  getMovies,
  postMovie,
  deleteMovie,
} = require('../controllers/movies');

const movieRouter = express.Router();

const {
  movieValidation,
  movieIdValidation,
} = require('../middlewares/validation');

movieRouter.get('/', getMovies);
movieRouter.post('/', movieValidation, postMovie);
movieRouter.delete('/:_id', movieIdValidation, deleteMovie);

module.exports = movieRouter;
