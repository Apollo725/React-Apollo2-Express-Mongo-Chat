import { ApolloServer, gql } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import connectRedis from 'connect-redis'

import typeDefs from './typeDefs'
import resolvers from './resolvers'
import {
  APP_PORT,
  IN_PROD,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  SESSION_NAME,
  SESSION_SESCRET,
  SESSION_LIFETIME,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD
} from './config'

(async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0-mgqh3.azure.mongodb.net/${DB_NAME}`,
      {useNewUrlParser: true}
    )
    
    const app = express()
    const RedisStore = connectRedis(session)
    const store = new RedisStore({
      host: REDIS_HOST,
      port: REDIS_PORT,
      pass: REDIS_PASSWORD
    })
    app.disable('x-powered-by')
    
    app.use(session({
      store,
      name: SESSION_NAME,
      secret: SESSION_SESCRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: SESSION_LIFETIME,
        sameSite: true,
        secure: IN_PROD
      }
    }))

    const server = new ApolloServer({
      // These will be defined for both new or existing servers
      typeDefs,
      resolvers,
      playground: !IN_PROD,
      context: ({ req, res }) => ({ req, res })
    });
    
    server.applyMiddleware({ app }); // app is from an existing express app
    
    app.listen({ port: APP_PORT }, () =>
      console.log(`� Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`)
    )
  } catch (e) {
    console.error(e)
  }
})()
