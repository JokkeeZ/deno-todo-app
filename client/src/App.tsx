import { useEffect, useState } from "react";
import TodoItem, { Todo } from "./TodoItem.tsx";

export default function App() {
  const [todoItems, setTodoItems] = useState<Todo[]>([]);
  const [addingTodo, setAddingTodo] = useState(false);
  const [todoItem, setTodoItem] = useState<Todo>({
    id: 0,
    text: "",
    completed: false,
  });

  useEffect(() => {
    fetch("/api/todos/")
      .then((response) => response.json())
      .then((data) => {
        console.log('fetching');
        setTodoItems(data);
      });
  }, []);

  const handleAddTodo = () => {
    setAddingTodo(true);
  };

  const removeTodo = (id: number) => {
    setTodoItems(todoItems.filter((item) => item.id !== id));
  };

  const createNewTodo = (todo: Todo) => {
    fetch("/api/todos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        todo.id = response.id;
        setTodoItems([...todoItems, todo]);
      }

      setAddingTodo(false)
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
              onClick={handleAddTodo}
            >
              Add new todo
            </button>
            <button type="button" className="btn btn-primary mx-1">
              Remove all todos
            </button>
          </div>
        </div>

        <div className="row justify-content-md-center mt-3">
          <div className="col col-lg-8">
            {addingTodo
              ? (
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter a new todo item"
                    onChange={(e) =>
                      setTodoItem({
                        id: todoItems.length + 1,
                        text: e.target.value,
                        completed: false,
                      })}
                  />
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() =>
                      createNewTodo({
                        id: todoItems.length + 1,
                        text: todoItem.text,
                        completed: false,
                      })}
                  >
                    Add todo
                  </button>
                </div>
              )
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
