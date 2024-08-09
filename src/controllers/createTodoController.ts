import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const createTodoController = async (req: Request, res: Response) => {
    const Id = req.currentUser?.id;
    const { title, description } = req.body;

    const todo = await prisma.todo.create({
        data: {
            title,
            description,
            userId: Number(Id)
        }
    });

    res.status(201).send(todo);
}