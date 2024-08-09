import express from 'express';
import { requireAuth } from '../middlewares/require-auth';
import { validateRequest } from '../middlewares/validate-request';
import validateTodo from '../utils/validateTodo';
import { createTodoController } from '../controllers/createTodoController';
import { currentUser } from '../middlewares/current-user';

const router = express.Router();


router.post(
    '/',
    currentUser,
    requireAuth,
    validateTodo,
    validateRequest,
    createTodoController
);

export { router as createTodoRouter };