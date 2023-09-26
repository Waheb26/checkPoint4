export interface Task {
  id: number;
  title: string;
  description?: string;
  createdAt: string;
  status: boolean;
  tags: Tag[];
}

export interface Tag {
  id: number;
  name: string;
  priority: boolean;
  tasks: Task[];
}
