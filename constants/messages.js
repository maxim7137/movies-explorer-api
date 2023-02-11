const corsMessage = 'Не разрешено CORS';
const noMovieMessage = 'Фильм с таким _id не найден';
const noUserMessage = 'Пользователь с таким _id не найден';
const notMyMovieMessage = 'Удалять можно только фильмы добавленные вами';
const deletedMovieMessage = 'Фильм удален';
const wrongIdMessage = 'Введен некорректный _id';
const requiredIdMessage = 'Необходимо указать id';
const conflictMessage = 'Пользователь с таким email уже существует';
const missMessage = 'Неправильные почта или пароль';
const authMessage = 'Необходима авторизация';
const serverErrorMessage = 'На сервере произошла ошибка';
const mailMessage = 'Ведите почту, например: example@mail.com';
const mailRequiredMessage = 'Почта обязательна';
const minPasswordMessage = 'Пароль не менее 6 символов';
const passwordRequiredMessage = 'Пароль обязателен';
const nameLengthMessage = 'Имя от 2 до 30 символов';
const nameRequiredMessage = 'Имя обязательно';
const countryRequiredMessage = 'Страна обязательна';
const directorRequiredMessage = 'Режиссёр обязателен';
const durationRequiredMessage = 'Длительность обязательна';
const yearRequiredMessage = 'Год обязателен';
const descriptionRequiredMessage = 'Описание обязательно';
const wrongLinkMessage = 'Некорректная ссылка, едите ссылку, например: https://example.com';
const linkRequiredMessage = 'Ссылка обязательна';
const nameRURequiredMessage = 'Название фильма на русском языке обязательно';
const nameENRequiredMessage = 'Название фильма на английском языке обязательно';
const notFoundMessage = 'Ресурс не найден. Проверьте URL и метод запроса';

module.exports = {
  corsMessage,
  noMovieMessage,
  notMyMovieMessage,
  deletedMovieMessage,
  wrongIdMessage,
  noUserMessage,
  conflictMessage,
  missMessage,
  authMessage,
  serverErrorMessage,
  mailMessage,
  mailRequiredMessage,
  minPasswordMessage,
  passwordRequiredMessage,
  nameLengthMessage,
  nameRequiredMessage,
  requiredIdMessage,
  countryRequiredMessage,
  directorRequiredMessage,
  durationRequiredMessage,
  yearRequiredMessage,
  descriptionRequiredMessage,
  wrongLinkMessage,
  linkRequiredMessage,
  nameRURequiredMessage,
  nameENRequiredMessage,
  notFoundMessage
};
