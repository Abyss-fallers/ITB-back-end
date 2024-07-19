import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import { getMe, login, register } from './controllers/UserController.js'
import './mongo/connection.js'
import { checkAuth, handleValidationErrors } from './utils/index.js'
import { loginValidation, registerValidation } from './validation.js'

const app = express()

app.use(express.json())
app.use(cors())

app.post('/auth/login', loginValidation, handleValidationErrors, login)
app.post('/auth/register', registerValidation, handleValidationErrors, register)
app.get('/auth/me', checkAuth, getMe)

const PORT = process.env.PORT || 4444

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err)
  }

  console.log(`Server OK on port ${PORT}`)
})
