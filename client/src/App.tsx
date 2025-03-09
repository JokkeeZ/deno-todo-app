import { useEffect, useState } from "react";
import TodoItem, { Todo } from "./TodoItem.tsx";
import CreateTodoItem from "./CreateTodoItem.tsx";

export default function App() {
  const [todoItems, setTodoItems] = useState<Todo[]>([]);
  const [addingTodo, setAddingTodo] = useState(false);

  useEffect(() => {
    fetch("/api/todos/")
      .then((response) => response.json())
      .then((data) => {
        setTodoItems(data);
      });
  }, []);

  const removeTodo = (id: number) => {
    setTodoItems(todoItems.filter((item) => item.id !== id));
  };

  const todoCreated = (todo: Todo) => {
    setTodoItems([...todoItems, todo]);
    setAddingTodo(false);
  };

  const removeAllTodos = () => {
    fetch('/api/todos/clear', {
      method: 'DELETE'
    })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      setTodoItems([]);
    });
  };

  return (
    <div className="container">
      <h1 className="mt-5 text-center">Todo list</h1>

      <div className="grid mt-3">
        <div className="row justify-content-md-center">
          <div className="col col-lg-8 d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-success mx-1"
              onClick={() => setAddingTodo(true)}
            >
              Add new todo
            </button>
            <button
              type="button"
              className="btn btn-primary mx-1"
              onClick={removeAllTodos}>
              Remove all todos
            </button>
          </div>
        </div>

        <div className="row justify-content-md-center mt-3">
          <div className="col col-lg-8">
            {addingTodo
              ? <CreateTodoItem onCreate={todoCreated} />
              : (
                <div className="list-group">
                  {todoItems.map((item) => (
                    <TodoItem
                      key={item.id}
                      todo={item}
                      onRemove={removeTodo}
                    />
                  ))}
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
