import { useState } from "react";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

interface TodoItemProps {
  todo: Todo,
  onRemove: (id: number) => void
};

export default function TodoItem({ todo, onRemove }: TodoItemProps) {
  const [item, setItem] = useState<Todo>(todo);
  const [isEditing, setIsEditing] = useState(false);

  const edit = () => {
    setIsEditing(true);
  };

  const statusChange = () => {
    item.completed = !item.completed;

    fetch(`/api/todos/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setItem({ id: item.id, text: item.text, completed: item.completed });
        }
      });
  };

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem({ id: item.id, text: e.target.value, completed: item.completed });
  };

  const remove = () => {
    fetch(`/api/todos/${item.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((response) => {
      if (response.success) {
        onRemove(item.id);
        setIsEditing(false);
      }
    });
  };

  const save = () => {
    setIsEditing(false);

    fetch(`/api/todos/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((response) => {
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
          <input
            className="form-check-input"
            type="checkbox"
            checked={item.completed}
            onChange={statusChange}
          />
          {isEditing
            ? (
              <input
                type="text"
                className="form-control mx-2"
                value={item.text}
                onChange={(e) => onTextChange(e)}
              />
            )
            : <span className="lead align-text-bottom">{item.text}</span>}

          {isEditing
            ? (
              <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={remove}
              >
                Delete
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={save}
              >
                Save
              </button>
              </div>
            )
            : (
              <button
                type="button"
                className="btn btn-success"
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
