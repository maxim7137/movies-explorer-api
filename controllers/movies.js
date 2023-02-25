const Movie = require('../models/movie');
const NotFoundError = require('../errors/notFound');
const BadRequest = require('../errors/badRequest');
const NoAccess = require('../errors/noAccess');
const {
  noMovieMessage,
  notMyMovieMessage,
  deletedMovieMessage,
  wrongIdMessage,
} = require('../constants/messages');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
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
  const owner = req.user._id;
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
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequest(`${error.message.split('-')[1]}`));
      } else {
        next(error);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;
  Movie.findById(movieId)
    .orFail(new NotFoundError(noMovieMessage))
    .then((movie) => {
      if (!movie.owner.equals(userId)) {
        throw new NoAccess(notMyMovieMessage);
      } else {
        movie.delete();
        res.send({ message: deletedMovieMessage });
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequest(wrongIdMessage));
      } else {
        next(error);
      }
    });
};
