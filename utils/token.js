import jwt from 'jsonwebtoken'
import { config } from '../config/index.js'

export const generateAccessToken = (userId) => {
  return jwt.sign({ _id: userId }, config.jwt.accessSecret, {
    expiresIn: config.jwt.accessExpiresIn,
  })
}

export const generateRefreshToken = (userId) => {
  return jwt.sign({ _id: userId }, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpiresIn,
  })
}

export const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret)
  } catch (err) {
    return null
  }
}
