import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import { config } from './config/index.js' // Импорт конфигурации
import { errorHandler } from './errors/errorHandler.js' // Обработчик ошибок
import { configureHelmet } from './middlewares/securityMiddleware.js' // Импортируем настройки helmet
import { connectDB } from './mongo/connection.js' // Подключение к базе данных
import authRoutes from './routes/authRoutes.js' // Импорт маршрутов аутентификации

const app = express()

configureHelmet(app)
app.use(express.json())
app.use(cors())

connectDB()

app.use('/auth', authRoutes)

app.use(errorHandler)

app.listen(config.port, (err) => {
  if (err) {
    console.error('Error starting server:', err)
    return
  }
  console.log(`Server running on port ${config.port}`)
})
