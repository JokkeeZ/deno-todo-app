import { useState } from "react";
import { Todo } from "./TodoItem.tsx";

export interface CreateTodoItemProps {
  onCreate: (todo: Todo) => void;
}

export default function CreateTodoItem({ onCreate }: CreateTodoItemProps) {
  const [todo, setTodo] = useState<Todo>({
    id: 0,
    text: "",
    completed: false,
  });

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({
      id: todo.id,
      text: e.target.value,
      completed: todo.completed,
    });
  };

  const create = () => {
    setTodo(todo);

    fetch("/api/todos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          todo.id = response.id;
          onCreate(todo);
        }
      });
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        autoFocus
        className="form-control"
        placeholder="Enter a new todo item"
        onChange={(e) => onTextChange(e)}
      />
      <button
        className="btn btn-primary"
        type="button"
        onClick={create}
      >
        Add todo
      </button>
    </div>
  );
}
