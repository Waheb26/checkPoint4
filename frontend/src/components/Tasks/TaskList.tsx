import React from "react";
import { Task } from "../../types";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import "./TaskList.css";

interface TaskListProps {
  tasks: Task[];
  onEditTask: (task: Task, tags: string[]) => void;
  onDeleteTask: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEditTask,
  onDeleteTask,
}) => {
  const handleEditTask = (task: Task) => {
    onEditTask(task, []);
  };

  const handleDeleteTask = (taskId: number) => {
    onDeleteTask(taskId);
  };

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>Aucune tâche créée pour le moment.</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="task-box">
            <strong className="task-title">{task.title}</strong>
            <p>{task.description}</p>{" "}
            <div className="handleIcon">
              <FaEdit className="edit" onClick={() => handleEditTask(task)} />
              <FaTrashAlt
                className="icon"
                onClick={() => handleDeleteTask(task.id)}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
