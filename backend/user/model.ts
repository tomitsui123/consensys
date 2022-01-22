import mongoose, { mongo } from 'mongoose'

interface User {
  username: string;
  password: string;
  logoutDatetime?: string;
}

const userSchema = new mongoose.Schema<User>({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  logoutDatetime: {
    type: String,
    required: false
  }
})

const User = mongoose.model('User', userSchema)

export default User