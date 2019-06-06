import { ApolloServer, gql } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'

import typeDefs from './typeDefs'
import resolvers from './resolvers'
import {
  APP_PORT,
  IN_PROD,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST ,
  DB_PORT,
  DB_NAME,
} from './config'

(async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://apollo725:Test123!@cluster0-mgqh3.azure.mongodb.net/chat`,
      {useNewUrlParser: true}
    )
    
    const app = express()
    
    app.disable('x-powered-by')
    
    const server = new ApolloServer({
      // These will be defined for both new or existing servers
      typeDefs,
      resolvers,
      playground: !IN_PROD
    });
    
    server.applyMiddleware({ app }); // app is from an existing express app
    
    app.listen({ port: 4000 }, () =>
      console.log(`� Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`)
    )
  } catch (e) {
    console.error(e)
  }
})()
