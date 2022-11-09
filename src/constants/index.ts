// App
export const DEFAULT_PORT = 3000;
export const DEFAULT_DB_URL = 'mongodb://localhost:27017/mestodb';

// HTTP Statuses
export const HTTP_STATUS_CREATED = 201;
export const HTTP_STATUS_BAD_REQUEST = 400;
export const HTTP_STATUS_UNAUTHORIZED = 401;
export const HTTP_STATUS_FORBIDDEN = 403;
export const HTTP_STATUS_NOT_FOUND = 404;
export const HTTP_STATUS_CONFLICT = 409;
export const HTTP_STATUS_SERVER_ERROR = 500;

// Default User id
export const DEFAULT_USER_NAME = 'Жак-Ив Кусто';
export const DEFAULT_USER_ABOUT = 'Исследователь';
export const DEFAULT_USER_AVATAR = 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png';

// Error names
export const VALIDATION_ERROR = 'ValidationError';
export const CAST_ERROR = 'CastError';

// Error codes
export const CONFLICT_ERROR_CODE = 11000;

// User messages
export const USER_NOT_FOUND = 'Пользователь не найден';
export const USER_NOT_AUTH = 'Неверная почта или пароль';
export const USER_DUP_EMAIL = 'Пользователь с таким e-mail уже существует';
export const USER_ERR_NAME = 'Имя пользователя должно быть от 2 до 30 символов';
export const USER_ERR_ABOUT = 'Описание должно быть от 2 до 200 символов';
export const USER_ERR_EMAIL_EMPTY = 'E-mail должен быть введен';
export const USER_ERR_EMAIL = 'Не корректно задан e-mail';
export const USER_ERR_AVATAR = 'URL аватара указано не корректно';
export const USER_ERR_PASSWORD_EMPTY = 'Пароль должен быть введен';
export const USER_ERR_PASSWORD_LEN = 'Длина пароля должна быть не меньше 6 символов';

// Token
export const TOKEN_INCORRECT = 'Некорректный токен';
export const TOKEN_SECRET = 'super-strong-secret';
export const TOKEN_NOT_IN_HEADER = 'Отсутствует заголовок авторизации';
export const TOKEN_LIFE_TIME = '7d';

// Cards messages
export const CARD_NOT_FOUND = 'Карточка не найдена';
export const CARD_DELETED = 'Карточка удалена';
export const CARD_DELETE_FORBIDDEN = 'Удалять не свои карточки запрещено';
export const CARD_ERR_NAME = 'Название карточки должно быть от 2 до 20 символов';
export const CARD_ERR_LINK = 'URL ссылки указано не корректно';

// URL Pattern
export const URL_PATTERN = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_+.~#?&/=]*$/;
