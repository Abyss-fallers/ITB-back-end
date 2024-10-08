export const errorHandler = (err, _req, res, _next) => {
  console.error(err) // Логируем ошибку в консоль или в файл логов

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: 'error',
      statusCode: err.statusCode,
      message: err.message,
    })
  }

  return res.status(500).json({
    status: 'error',
    statusCode: 500,
    message: 'Что-то пошло не так',
  })
}
