import mongoose from 'mongoose'

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

export default mongoose.model('User', userSchema)