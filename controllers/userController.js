import UserModel from '../models/userSchema.js'
import {
  getUserById,
  loginUser,
  registerUser,
} from '../services/userService.js'
import { sendSuccessResponse } from '../utils/response.js'
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from '../utils/token.js'

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

export const refreshToken = async (req, res, next) => {
  try {
    const { token } = req.body

    if (!token) {
      console.error('Token not provided')
      return res.status(400).json({ message: 'Token is required' })
    }

    const decoded = verifyToken(token, process.env.JWT_REFRESH_SECRET)
    if (!decoded) {
      console.error('Invalid token')
      return res.status(401).json({ message: 'Invalid token' })
    }

    console.log('Token decoded successfully:', decoded)

    const user = await UserModel.findById(decoded._id)
    if (!user) {
      console.error('User not found:', decoded._id)
      return res.status(404).json({ message: 'User not found' })
    }

    console.log('User found:', user)

    const newAccessToken = generateAccessToken(user._id)
    const newRefreshToken = generateRefreshToken(user._id)

    console.log('New tokens generated:', { newAccessToken, newRefreshToken })

    return res.json({
      success: true,
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    })
  } catch (error) {
    console.error('Error in refreshToken handler:', error)
    return res.status(500).json({ message: 'Что-то пошло не так' })
  }
}
