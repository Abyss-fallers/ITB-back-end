export class AppError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Ресурс не найден') {
    super(message, 404)
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Ошибка валидации') {
    super(message, 400)
  }
}

export class AuthError extends AppError {
  constructor(message = 'Ошибка аутентификации') {
    super(message, 401)
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Доступ запрещен') {
    super(message, 403)
  }
}
