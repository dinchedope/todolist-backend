import { body } from 'express-validator';

export const registerValidation = [
    body('nickName', 'Имя должно иметь более 3 символов и менее 20').isLength({ min: 3, max: 20 }),
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 8 символов').isLength({ min: 5 }),
];

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
]