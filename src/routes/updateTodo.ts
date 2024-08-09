import express from 'express';
import { requireAuth } from '../middlewares/require-auth';
import { validateRequest } from '../middlewares/validate-request';
import validateTodo from '../utils/validateTodo';
import { updateTodoController } from '../controllers/updateTodoController';
import { currentUser } from '../middlewares/current-user';

const router = express.Router();


router.patch(
    '/:Id',
    currentUser,
    requireAuth,
    validateTodo,
    validateRequest,
    updateTodoController
);

export { router as updateTodoRouter };