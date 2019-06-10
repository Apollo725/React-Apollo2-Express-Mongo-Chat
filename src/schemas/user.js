import Joi from '@hapi/joi'

const email = Joi.string().email().required().label('Email')
const username = Joi.string().alphanum().min(4).max(30).required().label('Username')
const name = Joi.string().max(254).required().label('Name')
const password = Joi.string().min(8).max(50).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/).label('Password').options({
  language: {
    string: {
      regex: {
        base: 'must have at least one lowercase letter, one uppercase letter, one digit, and one special character.'
      }
    }
  }
})

export const signUp = Joi.object().keys({
  email, username, name, password
})

export const signIn = Joi.object().keys({
  email, password
})
