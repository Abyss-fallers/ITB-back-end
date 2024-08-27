import { validationResult } from 'express-validator'

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      statusCode: 400,
      message: 'Ошибка валидации данных',
      errors: errors.array(),
    })
  }

  next()
}

export default handleValidationErrors
