const router = require('express').Router();
const {
  validateMovieId,
  validateMovieCreate,
} = require('../middlewares/validations');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies); // возвращает все сохранённые текущим  пользователем фильмы
router.post('/', validateMovieCreate, createMovie); // createMovie создаёт фильм с переданными в теле
// country,director,duration,year,description,image,trailerLink,nameRU,nameEN,thumbnail,movieId
router.delete('/:movieId', validateMovieId, deleteMovie); // удаляет сохранённый фильм по id

module.exports = router;
