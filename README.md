# movies-explorer-api

Бэкенд сервиса, в котором можно найти фильмы по запросу и сохранить в личном кабинете

## Домены для диплома

- max.nomoredomainsclub.ru      [Фронтенд](https://max.nomoredomainsclub.ru)
- api.max.nomoredomainsclub.ru  [Бэкенд](https://api.max.nomoredomainsclub.ru)

### Эндпоинты

|Метод|Эндпоинт|Назначение|
|-|-|-|
|Роуты незащищенные авторизацией|
|POST|/signup|регистрация нового пользователя|
|POST|/signin|вход для зарегистрированного пользователя|
|Роуты защищенные авторизацией|
|GET|/users/me|возвращает информацию о пользователе|
|PATCH|/users/me|обновляет информацию о пользователе|
|GET|/movies|возвращает все сохранённые текущим  пользователем фильмы|
|POST|/movies|создаёт фильм|
|DELETE|/movies/_id|удаляет сохранённый фильм по id|
