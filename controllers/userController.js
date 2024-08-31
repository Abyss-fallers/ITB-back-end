import {
  getUserById,
  loginUser,
  registerUser,
} from '../services/userService.js'
import { sendSuccessResponse } from '../utils/response.js'

export const register = async (req, res, next) => {
  const { email, password, confirmPassword, fullName } = req.body

  try {
    const { user, accessToken, refreshToken } = await registerUser(
      email,
      password,
      confirmPassword,
      fullName
    )
    const { passwordHash, ...userData } = user.toObject()

    sendSuccessResponse(res, {
      ...userData,
      accessToken,
      refreshToken,
    })
  } catch (err) {
    next(err)
  }
}

export const login = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const { user, accessToken, refreshToken } = await loginUser(email, password)
    const { passwordHash, ...userData } = user.toObject()

    sendSuccessResponse(res, {
      ...userData,
      accessToken,
      refreshToken,
    })
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
