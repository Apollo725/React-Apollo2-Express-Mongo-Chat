export const {
  APP_PORT = 4000,
  NODE_ENV = 'development',
  DB_USERNAME = 'apollo725',
  DB_PASSWORD = 'xxxxxxx',
  DB_NAME = 'chat',

  SESSION_NAME = 'sid',
  SESSION_SESCRET = 'ssh!secret!',
  SESSION_LIFETIME = 1000 * 60 * 60 *2,

  REDIS_HOST = 'localhost',
  REDIS_PORT = 6379,
  REDIS_PASSWORD = 'secret'
} = process.env

export const IN_PROD = NODE_ENV === 'production'
