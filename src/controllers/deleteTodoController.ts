import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "../errors/not-found-error";
import { NotAuthorizedError } from "../errors/not-authorized-error";

const prisma = new PrismaClient();

export const deleteTodoController = async (req: Request, res: Response) => {
    const { Id } = req.params;
    const userId = req.currentUser?.id;

    const todo = await prisma.todo.findUnique({
        where: {
            id: Number(Id),
            userId
        }
    });

    if (!todo) {
        throw new NotFoundError();
    }

    if (todo.userId !== req.currentUser?.id) {
        throw new NotAuthorizedError();
    }


    const deletedTodo = await prisma.todo.delete({
        where: {
            id: Number(Id),
            userId
        }
    })

    res.status(204).send(deletedTodo);
}