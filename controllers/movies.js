const Movie = require('../models/movie');
const NotFoundError = require('../utils/errors/NotFoundError'); //  404
const BadRequestError = require('../utils/errors/BadRequestError'); //  400
const ForbiddenError = require('../utils/errors/ForbiddenError'); // 403

const {
  BAD_REQUEST_ERROR,
  VALIDATION_ERROR,
  NOT_FOUND_FILM_ID,
  FORBIDDENERROR_DELETE,
} = require('../utils/errors/errors');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.status(200).send({ movies });
    })
    .catch(next);
};

module.exports.postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => { res.status(201).send(movie); })
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequestError(err));
        return;
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => Movie.findById(req.params._id)
  .then((movie) => {
    if (!movie) {
      throw new NotFoundError(NOT_FOUND_FILM_ID);
    } else if (req.user._id !== movie.owner._id.toString()) {
      throw new ForbiddenError(FORBIDDENERROR_DELETE);
    } else {
      Movie.findByIdAndRemove(req.params._id)
        .then((savedMovie) => {
          if (!savedMovie) {
            throw new NotFoundError(NOT_FOUND_FILM_ID);
          }
          res.status(200).send({ movie, message: 'Ваш фильм успешно удален' });
        })
        .catch(next);
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError(BAD_REQUEST_ERROR));
    } else {
      next(err);
    }
  });
