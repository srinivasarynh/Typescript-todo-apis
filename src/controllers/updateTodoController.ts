import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "../errors/not-found-error";
import { NotAuthorizedError } from "../errors/not-authorized-error";

const prisma = new PrismaClient();

export const updateTodoController = async (req: Request, res: Response) => {
    const { Id } = req.params;
    const userId = req.currentUser?.id;
    const { title, description, done, inProgress } = req.body;


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


    const updatedTodo = await prisma.todo.update({
        data: {
            title,
            description,
            inProgress,
            done
        },
        where: {
            id: Number(Id),
            userId
        }
    })

    res.status(200).send(updatedTodo);
}