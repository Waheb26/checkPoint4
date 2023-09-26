import React, { useState } from "react";
import "./CreateTag.css";

interface CreateTagProps {
  onCreate: (name: string, color: string) => void;
}

const CreateTag: React.FC<CreateTagProps> = ({ onCreate }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  const handleCreate = () => {
    if (name && color) {
      onCreate(name, color);
      setName("");
      setColor("");
    }
  };

  return (
    <div className="create-tag">
      <h2>Créer une nouvelle balise</h2>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Couleur"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="color-input-field"
        />
      </div>
      <div className="button-wrapper">
        <button onClick={handleCreate} className="create-button">
          Créer
        </button>
      </div>
    </div>
  );
};

export default CreateTag;
