import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  try {
    const tag1 = await prisma.tag.create({
      data: {
        name: "Réunion",
        priority: 1,
      },
    });

    const tag2 = await prisma.tag.create({
      data: {
        name: "Lessive",
        priority: 2,
      },
    });

    const task1 = await prisma.task.create({
      data: {
        title: "Réunion avec l'équipe",
        description: "Présenter les nouvelles fonctionnalités du projet.",
        tags: {
          connect: [{ id: tag1.id }],
        },
      },
    });

    const task2 = await prisma.task.create({
      data: {
        title: "Faire les courses",
        description: "Acheter des ingrédients pour le dîner.",
        tags: {
          connect: [{ id: tag2.id }],
        },
      },
    });

    console.log("Seed data inserted successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
