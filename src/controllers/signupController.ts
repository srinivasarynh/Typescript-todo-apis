import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from "@prisma/client";
import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

import { BadRequestError } from "../errors/bad-request-error"
import config from '../config';

const scryptAsync = promisify(scrypt);


const prisma = new PrismaClient();

async function toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString('hex')}.${salt}`;
}


export const signup = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    });


    if (existingUser) {
        throw new BadRequestError('Email in use');
    }

    const hasedPassword = await toHash(password);

    const user = await prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            password: hasedPassword
        }
    });

    user.password = "";

    const userJwt = jwt.sign(
        {
            id: user.id,
            email: user.email,
        },
        config.JWT_SECRET
    );

    req.session.jwt = userJwt

    res.status(201).send(user);
}

