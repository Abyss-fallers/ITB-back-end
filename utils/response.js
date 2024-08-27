export const sendSuccessResponse = (res, data, statusCode = 200) => {
  res.status(statusCode).json(data)
}

export const sendErrorResponse = (res, error, statusCode = 500) => {
  res.status(statusCode).json({ status: 'error', message: error.message })
}
