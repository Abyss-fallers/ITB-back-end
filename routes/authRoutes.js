import { Router } from 'express'
import {
  getMe,
  login,
  refreshToken,
  register,
} from '../controllers/userController.js'
import handleValidationErrors from '../errors/handleValidationErrors.js'
import { checkAuth } from '../utils/index.js'
import { loginValidation, registerValidation } from '../validators/index.js'

const router = Router()

router.post('/login', loginValidation, handleValidationErrors, login)
router.post('/register', registerValidation, handleValidationErrors, register)
router.get('/me', checkAuth, getMe)
router.post('/refresh', refreshToken)

export default router
