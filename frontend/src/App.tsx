import React, { useState, useEffect } from "react";
import axios from "axios";
import { Task } from "./types";
import TaskList from "./components/Tasks/TaskList";
import CreateTask from "./components/Tasks/CreateTask";
import Footer from "./components/Footer";
import avatar from "./assests/avatar.jpg";
import { FaRegCalendarCheck } from "react-icons/fa";
import "./App.css";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | string | null>(
    null
  );
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await axios.get<Task[]>("http://localhost:5000/task");
      setTasks(response.data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  const createTask = async (title: string, description: string) => {
    try {
      const response = await axios.post<Task>("http://localhost:5000/task", {
        title,
        description,
      });

      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const updateTask = async (updatedTask: Task) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/task/${updatedTask.id}`,
        updatedTask
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? response.data : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await axios.delete(`http://localhost:5000/task/${taskId}`);
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <div>
      <div className="Header">
        <label htmlFor="imageUpload" className="ImageUploadButton">
          {typeof selectedImage === "string" ? (
            <img src={selectedImage} alt="avatar" />
          ) : (
            <img src={avatar} alt="avatar" />
          )}
          <input
            type="file"
            accept="image/*"
            id="imageUpload"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </label>
        <h1>
          DO IT NOW <FaRegCalendarCheck />
        </h1>
      </div>
      <div className="Components">
        {selectedTask ? (
          <CreateTask
            taskToEdit={selectedTask}
            onEdit={updateTask}
            onCreate={createTask}
            onCancelEdit={() => setSelectedTask(null)}
          />
        ) : (
          <CreateTask onCreate={createTask} />
        )}

        <TaskList
          tasks={tasks}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />
      </div>
      <Footer />
    </div>
  );
};

export default App;
