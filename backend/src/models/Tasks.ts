import { Prisma } from "@prisma/client";

export interface TaskCreateInput {
  title: string;
  description?: string;
}

export interface TaskUpdateInput {
  title?: string;
  description?: string;
  status?: boolean;
}

export type TaskWhereUniqueInput = Prisma.TaskWhereUniqueInput;
