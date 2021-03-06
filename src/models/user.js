import mongoose from 'mongoose'
import { hash, compare } from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: email => User.dontExist({ email }),
      message: ({ value }) => `Email ${value} has already been taken.`
    }
  },
  username: {
    type: String,
    validate: {
      validator: username => User.dontExist({ username }),
      message: ({ value }) => `Username ${value} has already been taken.`
    }
  },
  name: String,
  password: String
},{
  timestamps: true
})

userSchema.pre('save', async function(next) {
  console.log("password", this.isModified('password'))
  if (this.isModified('password')) {
    try {
      this.password = await hash(this.password, 10)
    } catch (err) {
      next(err)
    }
  } 
  next();
});

userSchema.statics.dontExist = async function(options) {
  console.log(await this.where(options).countDocuments)
  return await this.where(options).countDocuments() === 0
}

userSchema.methods.matchesPassword = function(password) {
  return compare(password, this.password)
}

const User = mongoose.model('User', userSchema)

export default User