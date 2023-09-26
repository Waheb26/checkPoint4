import React from "react";
import { Tag } from "../../types";
import "./TagList.css";

interface TagListProps {
  tags: Tag[];
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
  return (
    <div className="tag-list">
      <h2>Liste des balises</h2>
      <ul>
        {tags.map((tag) => (
          <li key={tag.id} className="tag-item">
            <strong className="tag-name">{tag.name}</strong>
            <p>Priorité : {tag.priority}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagList;
