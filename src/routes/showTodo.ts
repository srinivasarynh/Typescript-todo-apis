import express, { Request, Response } from 'express';
import { requireAuth } from '../middlewares/require-auth';
import { validateRequest } from '../middlewares/validate-request';
import { currentUser } from '../middlewares/current-user';
import { showTodoController } from '../controllers/showTodoController';

const router = express.Router();


router.get(
    '/',
    currentUser,
    requireAuth,
    validateRequest,
    showTodoController
);

export { router as showTodoRouter };