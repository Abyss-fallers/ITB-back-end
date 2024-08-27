import jwt from 'jsonwebtoken'
import { config } from '../config/index.js'
import { AuthError, ForbiddenError } from '../errors/AppError.js'

export default (req, _res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

  if (token) {
    try {
      const decoded = jwt.verify(token, config.jwt.secret)
      req.userId = decoded._id
      next()
    } catch (err) {
      next(new ForbiddenError('Нет доступа'))
    }
  } else {
    next(new AuthError('Токен не предоставлен'))
  }
}
