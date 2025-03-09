import { useState } from "react";
import { TodoItemTemplate } from "./TodoItemTemplate.tsx";

export default function TodoItem({ id, text, completed }: TodoItemTemplate) {
  const [item, setItem] = useState<TodoItemTemplate>({
    id: id,
    text: text,
    completed: completed,
  });

  const [isEditing, setIsEditing] = useState(false);

  const edit = () => {
    setIsEditing(true);
  };

  const changeCompleted = () => {
    setItem({ id: item.id, text: item.text, completed: !item.completed });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem({ id: item.id, text: e.target.value, completed: item.completed });
  };

  const save = () => {
    setIsEditing(false);

    fetch(`/api/todos/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item)
    })
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        setItem({ id: item.id, text: item.text, completed: item.completed });
      }

      setIsEditing(false);
    });
  };

  return (
    <>
      <div className="list-group-item list-group-item-action flex-column">
        <div className="d-flex justify-content-between align-items-center">
          <input className="form-check-input" type="checkbox" checked={item.completed} onChange={changeCompleted} />
          {isEditing
            ? (
              <input
                type="text"
                className="form-control mx-2"
                value={item.text}
                onChange={(e) => onChange(e)}
              />
            )
            : <span className="lead align-text-bottom">{item.text}</span>}
          {isEditing
            ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={save}
              >
                Save
              </button>
            )
            : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={edit}
              >
                Edit
              </button>
            )}
        </div>
      </div>
    </>
  );
}
