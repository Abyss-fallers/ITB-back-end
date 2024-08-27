import cors from 'cors'
import express from 'express'
import helmet from 'helmet'

// Функция для настройки middleware
export const setupMiddleware = (app) => {
  app.use(helmet()) // Защита заголовков
  app.use(express.json()) // Парсинг JSON запросов
  app.use(cors()) // Разрешение кросс-доменных запросов
}
