export const taskKeys: string[] = [
  "id",
  "title",
  "description",
  "createdAt",
  "status",
];

export const taskToCreate: Record<string, any> = {
  title: "Sport",
  description: "Entraînement de foot à 19h",
};

export const taskToUpdate: Record<string, any> = {
  title: "Updated Task Title",
  description: "Updated Task Description",
};

export default {
  taskKeys,
  taskToCreate,
  taskToUpdate,
};
