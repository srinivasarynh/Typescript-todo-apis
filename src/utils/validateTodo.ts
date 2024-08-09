import { body } from 'express-validator';

const validateTodo = [
    body('title').trim().notEmpty().withMessage('Task must have title'),
    body('description')
        .trim()
];


export default validateTodo;
