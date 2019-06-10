import Joi from '@hapi/joi'
import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import { User } from '../models'
import { signUp, signIn } from '../schemas'
import * as Auth from '../auth'

export default {
  Query: {
    me: (root, args, { req }, info) => {
      // TODO: projection
      Auth.checkSignedIn(req)

      return User.findById(req.session.userId)
    },
    users: (root, args, { req }, info) => {
      // TODO: auth
      Auth.checkSignedIn(req)

      return User.find({})
    },
    user: (root, { id }, { req }, info) => {
      // TODO: auth
      Auth.checkSignedIn(req)

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user ID.`)
      }
      return User.findById(id)
    }
  },
  Mutation: {
    signUp: async (root, args, { req }, info) => {
      
      Auth.checkSignedOut(req)

      await Joi.validate(args, signUp)
      
      return User.create(args)
    },
    signIn: async (root, args, { req }, info) => {
      const { userId } = req.session
      if (userId) {
        return User.findById(userId)
      }

      await Joi.validate(args, signIn, { abortEarly: false })

      const { email, password } = args
      const user = await Auth.atteptSignIn(email, password)

      req.session.userId = user.id
      
      return user
    },
    signOut: async (root, args, { req, res }, info) => {
      Auth.checkSignedIn(req)
      return Auth.signOut(req, res)
    }
  }
}