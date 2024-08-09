import express from 'express';
import { signoutController } from '../controllers/signoutController'
const router = express.Router();

router.get('/', signoutController);

export { router as signoutRouter };