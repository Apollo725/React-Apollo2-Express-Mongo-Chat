import mongoose from 'mongoose'
import { hash } from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    // minlength: [6, 'Email must be 6 charactors at least' ],
    // unique: true
  },
  username: String,
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


export default mongoose.model('User', userSchema)