import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: String,
  },
  {
    timestamps: true,
  }
)

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.passwordHash)
}

export default mongoose.model('User', UserSchema)
