const Movie = require('../models/movie');
const NotFoundError = require('../errors/notFound');
const BadRequest = require('../errors/badRequest');

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
    trailer,
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
    trailer,
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
  Movie.findById(movieId)
    .orFail(new NotFoundError('Фильм с таким _id не найден'))
    .then((movie) => {
      movie.delete();
      res.send({ message: 'Фильм удалён' });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequest('Введен некорректный _id'));
      } else {
        next(error);
      }
    });
};

/*
module.exports.likeMovie = (req, res, next) =>
  Movie.findByIdAndUpdate(
    req.params.movieId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .populate(['owner', 'likes'])
    .orFail(new NotFoundError('Фильм с таким _id не найдена'))
    .then((movie) => {
      res.send(movie);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequest('Введен некорректный _id'));
      } else {
        next(error);
      }
    });

module.exports.dislikeMovie = (req, res, next) =>
  Movie.findByIdAndUpdate(
    req.params.movieId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .populate(['owner', 'likes'])
    .orFail(new NotFoundError('Фильм с таким _id не найден'))
    .then((movie) => {
      res.send(movie);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequest('Введен некорректный _id'));
      } else {
        next(error);
      }
    });
 */
