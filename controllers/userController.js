import {
  getUserById,
  loginUser,
  registerUser,
} from '../services/userService.js'
import { sendSuccessResponse } from '../utils/response.js'

export const register = async (req, res, next) => {
  const { email, password, confirmPassword, fullName } = req.body

  try {
    const { user, token } = await registerUser(
      email,
      password,
      confirmPassword,
      fullName
    )
    const { passwordHash, ...userData } = user.toObject()
    sendSuccessResponse(res, { ...userData, token }) // Возвращаем данные напрямую, без data обёртки
  } catch (err) {
    next(err)
  }
}

export const login = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const { user, token } = await loginUser(email, password)
    const { passwordHash, ...userData } = user.toObject()
    sendSuccessResponse(res, { ...userData, token }) // Возвращаем данные напрямую, без data обёртки
  } catch (err) {
    next(err)
  }
}

export const getMe = async (req, res, next) => {
  try {
    const user = await getUserById(req.userId)
    const { passwordHash, ...userData } = user.toObject()
    sendSuccessResponse(res, userData)
  } catch (err) {
    next(err)
  }
}
