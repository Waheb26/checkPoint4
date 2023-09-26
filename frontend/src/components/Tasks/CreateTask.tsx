import React, { useState, useEffect } from "react";
import { Task } from "../../types";
import "./CreateTask.css";

interface CreateTaskProps {
  onCreate: (title: string, description: string) => void;
  onEdit?: (updatedTask: Task) => void;
  taskToEdit?: Task | null;
  onCancelEdit?: () => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({
  onCreate,
  onEdit,
  taskToEdit,
  onCancelEdit,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || "");
      setDescription(taskToEdit.description || "");
    }
  }, [taskToEdit]);

  const handleCreate = () => {
    if (title && description) {
      onCreate(title, description);
      setTitle("");
      setDescription("");
    }
  };

  const handleEdit = () => {
    if (onEdit && taskToEdit) {
      const updatedTask: Task = {
        ...taskToEdit,
        title,
        description,
      };
      onEdit(updatedTask);
      onCancelEdit?.();
      setTitle("");
      setDescription("");
    }
  };

  return (
    <div className="create-task">
      <h2>{taskToEdit ? "Modifier la tâche" : "Nouvelle tâche"}</h2>
      <div className="input-wrapper-task">
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field-task"
        />
      </div>
      <div className="input-wrapper-task">
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea-field"
        />
      </div>
      <div className="button-wrapper">
        {taskToEdit ? (
          <>
            <div className="boutons">
              <button onClick={handleEdit} className="create-button">
                Modifier
              </button>
              <button onClick={onCancelEdit} className="cancel-button">
                Annuler
              </button>
            </div>
          </>
        ) : (
          <button onClick={handleCreate} className="create-button">
            Créer
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateTask;
