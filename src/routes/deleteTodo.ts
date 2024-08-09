import express, { Request, Response } from 'express';
import { requireAuth } from '../middlewares/require-auth';
import { validateRequest } from '../middlewares/validate-request';
import { currentUser } from '../middlewares/current-user';
import { deleteTodoController } from '../controllers/deleteTodoController';
const router = express.Router();


router.get(
    '/:Id',
    currentUser,
    requireAuth,
    validateRequest,
    deleteTodoController
);

export { router as deleteTodoRouter };