import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createTask = async (req: Request, res: Response) => {
  const { title, description } = req.body;

  try {
    const newTask = await prisma.task.create({
      data: {
        title: title,
        description: description,
      },
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({
      error: "Une erreur s'est produite lors de la création de la tâche.",
    });
  }
};

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      error: "Une erreur s'est produite lors de la récupération des tâches.",
    });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) },
    });

    if (task) {
      res.status(200).json(task);
    } else {
      res
        .status(404)
        .json({ error: "La tâche spécifiée n'a pas été trouvée." });
    }
  } catch (error) {
    res.status(500).json({
      error: "Une erreur s'est produite lors de la récupération de la tâche.",
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: {
        title: title,
        description: description,
        status: status,
      },
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({
      error: "Une erreur s'est produite lors de la mise à jour de la tâche.",
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.task.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      error: "Une erreur s'est produite lors de la suppression de la tâche.",
    });
  }
};
