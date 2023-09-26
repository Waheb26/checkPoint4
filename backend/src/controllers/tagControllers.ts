import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createTag = async (req: Request, res: Response) => {
  const { name, priority } = req.body;

  try {
    const newTag = await prisma.tag.create({
      data: {
        name: name,
        priority: priority,
      },
    });
    res.status(201).json(newTag);
  } catch (error) {
    res.status(500).json({
      error: "Une erreur s'est produite lors de la création de la balise.",
    });
  }
};

export const getAllTags = async (req: Request, res: Response) => {
  try {
    const tags = await prisma.tag.findMany();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({
      error: "Une erreur s'est produite lors de la récupération des balises.",
    });
  }
};

export const getTagById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const tag = await prisma.tag.findUnique({
      where: { id: parseInt(id) },
    });

    if (tag) {
      res.status(200).json(tag);
    } else {
      res
        .status(404)
        .json({ error: "La balise spécifiée n'a pas été trouvée." });
    }
  } catch (error) {
    res.status(500).json({
      error: "Une erreur s'est produite lors de la récupération de la balise.",
    });
  }
};

export const updateTag = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, priority } = req.body;

  try {
    const updatedTag = await prisma.tag.update({
      where: { id: parseInt(id) },
      data: {
        name: name,
        priority: priority,
      },
    });
    res.status(200).json(updatedTag);
  } catch (error) {
    res.status(500).json({
      error: "Une erreur s'est produite lors de la mise à jour de la balise.",
    });
  }
};

export const deleteTag = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.tag.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      error: "Une erreur s'est produite lors de la suppression de la balise.",
    });
  }
};
