const cyrillicNameRegex = /^[а-яА-Я\s]+$/

const validateSingleCyrillicName = (name, isFirstName) => {
  if (!cyrillicNameRegex.test(name)) {
    return 'Имя должно содержать только кириллические буквы и пробелы'
  }
  if (name.trim().length < 2) {
    return isFirstName
      ? 'Имя должно быть не короче 2 символов'
      : 'Фамилия должна быть не короче 2 символов'
  }
  return ''
}

export const validateRegistrationData = (
  email,
  password,
  confirmPassword,
  fullName
) => {
  if (password !== confirmPassword) {
    throw new ValidationError('Пароли не совпадают')
  }

  validateSingleCyrillicName(fullName)
}
