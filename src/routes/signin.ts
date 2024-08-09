import express, { Request, Response } from 'express';
import { validateRequest } from "../middlewares/validate-request";
import { signinController } from '../controllers/signinController';

import validateSignin from '../utils/validateSignin';

const router = express.Router();

router.post(
    '/',
    validateSignin,
    validateRequest,
    signinController
);

export { router as signinRouter };