const mongoose = require('mongoose');

const regex = /^( http|https):\/\/(www\.)?([a-z0-9._])+([\w+\-\-._~:/?#[\]!$&’()*+,;=-])+(#?)/;

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (link) => regex.test(link),
    },
    message: 'Передайте ссылку',
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (link) => regex.test(link),
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (link) => regex.test(link),
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
    // ! Прописать связанность с базой данных фильмов
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
