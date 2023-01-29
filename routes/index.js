const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../errors/notFound');
const { notFoundMessage } = require('../constants/messages');

router.use('/', require('./auth'));

router.use('/movies', auth, require('./movies'));
router.use('/users', auth, require('./users'));

router.use('/*', auth, (req, res, next) => {
  next(new NotFoundError(notFoundMessage));
});

module.exports = router;
