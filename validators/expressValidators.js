import { body } from 'express-validator'

export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 7 символов').isLength({
    min: 7,
  }),
]

export const registerValidation = [
  body('email').isEmail().withMessage('Неверный формат почты'),
  body('password')
    .isLength({ min: 7 })
    .withMessage('Пароль должен быть минимум 7 символов')
    .matches(/\d/)
    .withMessage('Пароль должен содержать хотя бы одну цифру'),
  body('fullName').isLength({ min: 4 }).withMessage('Укажите имя'),
  body('avatarUrl')
    .optional()
    .isURL()
    .withMessage('Неверная ссылка на аватарку'),
]
