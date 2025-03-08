import { useState } from "react";
import { TodoItemTemplate } from "./TodoItemTemplate.tsx";

export default function TodoItem({ id, text, completed }: TodoItemTemplate) {
  const [item, setItem] = useState<TodoItemTemplate>({
    id: id,
    text: text,
    completed: completed,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem({ id: id, text: e.target.value, completed: completed });
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <>
      <div className="list-group-item list-group-item-action flex-column">
        <div className="d-flex justify-content-between align-items-center">
          <input className="form-check-input" type="checkbox" checked />
          {isEditing
            ? (
              <input
                type="text"
                className="form-control mx-2"
                value={item.text}
                onChange={(e) => handleChange(e)}
              />
            )
            : <span className="lead align-text-bottom">{item.text}</span>}
          {isEditing
            ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
              >
                Save
              </button>
            )
            : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleEdit}
              >
                Edit
              </button>
            )}
        </div>
      </div>
    </>
  );
}
