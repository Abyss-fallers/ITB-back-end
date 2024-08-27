import bcrypt from 'bcrypt'
import {
  AuthError,
  NotFoundError,
  ValidationError,
} from '../errors/AppError.js'
import UserModel from '../models/userSchema.js'
import { generateToken } from '../utils/token.js'
import { validateRegistrationData } from '../validators/customValidators.js'

export const registerUser = async (
  email,
  password,
  confirmPassword,
  fullName
) => {
  validateRegistrationData(email, password, confirmPassword, fullName)

  const salt = await bcrypt.genSalt(12)
  const hash = await bcrypt.hash(password, salt)

  try {
    const user = new UserModel({ email, fullName, passwordHash: hash })
    await user.save()

    return { user, token: generateToken(user._id) }
  } catch (err) {
    handleDBError(err)
  }
}

export const loginUser = async (email, password) => {
  const user = await UserModel.findOne({ email })
  if (!user) throw new NotFoundError('Пользователь не найден')

  const isValidPass = await user.comparePassword(password)
  if (!isValidPass) throw new AuthError('Неверный логин или пароль')

  return { user, token: generateToken(user._id) }
}

export const getUserById = async (userId) => {
  const user = await UserModel.findById(userId)
  if (!user) throw new NotFoundError('Пользователь не найден')

  return user
}

const handleDBError = (err) => {
  if (err.code === 11000) {
    throw new ValidationError('Регистрация не удалась, попробуйте позже.')
  }
  throw err
}
