import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from "@prisma/client";

import { Password } from '../utils/password';
import { BadRequestError } from "../errors/bad-request-error"
import config from '../config';



const prisma = new PrismaClient();


export const signinController = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
        throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch = await Password.compare(
        existingUser?.password!,
        password
    );
    if (!passwordsMatch) {
        throw new BadRequestError('Invalid Credentials');
    }
    existingUser.password = "";

    const userJwt = jwt.sign(
        {
            id: existingUser.id,
            email: existingUser.email,
        },
        config.JWT_SECRET
    );

    req.session.jwt = userJwt;

    res.status(200).send(existingUser);
}