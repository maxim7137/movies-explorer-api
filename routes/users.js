const router = require('express').Router();
const { validateUpdateUser } = require('../middlewares/validations');
const { getUser, updateUser } = require('../controllers/users');

router.get('/me', getUser); // возвращает информацию о пользователе (email и имя)
router.patch('/me', validateUpdateUser, updateUser); // обновляет информацию о пользователе (email и имя)

module.exports = router;
