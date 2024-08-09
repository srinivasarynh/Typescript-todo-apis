import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

interface UserPayload {
    id: number;
    email: string;
    iat: number
}


declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.session?.jwt) {
        return next();
    }

    try {
        const payload = jwt.verify(
            req.session.jwt,
            config.JWT_SECRET
        ) as UserPayload;
        req.currentUser = payload;
    } catch (err) { }

    next();
};