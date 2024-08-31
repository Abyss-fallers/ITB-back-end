import { config } from '../config/index.js'
import { AuthError, ForbiddenError } from '../errors/AppError.js'
import { verifyToken } from './token.js'

export default (req, _res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

  if (token) {
    const decoded = verifyToken(token, config.jwt.accessSecret)
    if (decoded) {
      req.userId = decoded._id
      next()
    } else {
      next(new ForbiddenError('Нет доступа'))
    }
  } else {
    next(new AuthError('Токен не предоставлен'))
  }
}
