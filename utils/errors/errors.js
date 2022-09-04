const BAD_REQUEST_ERROR = 'Переданы некорректные данные'; // 400
const INTERNAL_ERROR = 'Ошибка сервера'; // 500
const NOT_FOUND_ERROR = 'Запрашиваемой страницы не существует'; // 404
const NOT_FOUND_FILM_ID = 'Фильм с указанным _id не найден'; // 404
const NOT_FOUND_USER_ID = 'Пользователь с указанным _id не найден'; // 404
const NOT_FOUND_URL = 'Введите URL';
const FORBIDDENERROR_DELETE = 'Не хватает прав для удаления фильма'; // 403
const VALIDATION_ERROR = 'ValidationError';
const CAST_ERROR = 'CastError';
const CONFLICT_ERROR = 'Пользователь с такими данными уже существует'; // 409
const UNAUTHORIZED_ERROR = 'Требуется авторизация';
const CHECK_EMAIL_ERROR = 'Проверьте email';
const CHECK_PASSWORD_ERROR = 'Проверьте пароль';
const USER_DOESNT_EXIST = 'Пользователь не существует';

module.exports = {
  BAD_REQUEST_ERROR,
  INTERNAL_ERROR,
  VALIDATION_ERROR,
  CAST_ERROR,
  NOT_FOUND_URL,
  NOT_FOUND_ERROR,
  NOT_FOUND_FILM_ID,
  FORBIDDENERROR_DELETE,
  NOT_FOUND_USER_ID,
  CONFLICT_ERROR,
  UNAUTHORIZED_ERROR,
  CHECK_EMAIL_ERROR,
  CHECK_PASSWORD_ERROR,
  USER_DOESNT_EXIST,
};
