export const {
  APP_PORT = 4000,
  NODE_ENV = 'development',
  DB_USERNAME = 'apollo725',
  DB_PASSWORD = 'Test123!',
  DB_HOST = 'ds137863.mlab.com',
  DB_PORT = '37863',
  DB_NAME = 'chat'
} = process.env

export const IN_PROD = NODE_ENV === 'production'