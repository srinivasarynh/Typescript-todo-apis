import { body } from 'express-validator';

const validateSignup = [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters'),
    body('confirmPassword')
        .trim()
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Passwords must match')
];


// body('firstName').notEmpty().withMessage('First name must be provided'),
// body('lastName').notEmpty().withMessage('Last name must be provided'),


export default validateSignup;
