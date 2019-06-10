import { AuthenticationError } from "apollo-server-express";
import { User } from './models'
import { SESSION_NAME } from './config'

export const atteptSignIn = async (email, password) => {
  const message = "Incorrect email and password. Please try again."

  const user = User.findOne({ email })
  if (!user) {
    throw new AuthenticationError(message)
  }
  if (!await user.matchesPassword(password)) {
    throw new AuthenticationError(message)
  }

  return user
}

const signedIn = req => req.session.userId

export const checkSignedIn = req => {
  if (!signedIn(req)) {
    throw new AuthenticationError('You must be signed in.')
  }
}

export const checkSignedOut = req => {
  if (signedIn(req)) {
    throw new AuthenticationError('You are already signed in.')
  }
}

export const signOut = (req, res) => new Promise(
  (resolve, reject) => {
    req.session.destroy(err => {
      if (err) reject(err)
      res.clearCookies(SESSION_NAME)
      resolve(true)
    })
  }
)
