import jwt from 'jsonwebtoken'
import { config } from '../config/index.js'

export const generateToken = (userId) => {
  return jwt.sign({ _id: userId }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  })
}
