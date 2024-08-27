import { Router } from 'express'
import { getMe, login, register } from '../controllers/userController.js'
import handleValidationErrors from '../errors/handleValidationErrors.js'
import { checkAuth } from '../utils/index.js'
import { loginValidation, registerValidation } from '../validators/index.js'

const router = Router()

router.post('/login', loginValidation, handleValidationErrors, login)
router.post('/register', registerValidation, handleValidationErrors, register)
router.get('/me', checkAuth, getMe)

export default router
