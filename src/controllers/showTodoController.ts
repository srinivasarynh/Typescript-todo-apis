import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const showTodoController = async (req: Request, res: Response) => {
    const id = req.currentUser?.id;
    const todo = await prisma.todo.findMany({
        where: {
            userId: id
        }
    });

    res.status(200).send(todo);
}