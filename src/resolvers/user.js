import Joi from '@hapi/joi'
import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import { User } from '../models'
import { SignUp } from '../schemas'

export default {
  Query: {
    users: (root, args, context, info) => {
      return User.find({})
    },
    user: (root, {id}, context, info) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user ID.`)
      }
      return User.findById(id)
    }
  },
  Mutation: {
    signUp: async (root, args, context, info) => {
      
      await Joi.validate(args, SignUp)

      return User.create(args)
    },
  }
}