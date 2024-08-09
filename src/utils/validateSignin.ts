import { body } from 'express-validator';

const validateSignin = [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('You must supply a password'),
];


export default validateSignin;
