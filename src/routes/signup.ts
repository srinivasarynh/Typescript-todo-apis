import express from 'express';
import { validateRequest } from "../middlewares/validate-request";
import validateSignup from '../utils/validateSignup';
import { signup } from '../controllers/signupController';
const router = express.Router();

router.post(
    '/',
    validateSignup,
    validateRequest,
    signup
);

export { router as signupRouter };