import axios from "axios";
import { Task } from "./types";

const BASE_URL = "http://localhost:5000/task";

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get<Task[]>(`${BASE_URL}/task`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
