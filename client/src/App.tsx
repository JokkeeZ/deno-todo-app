import { useState } from "react";
import TodoItemList from "./TodoItemList.tsx";
import { TodoItemTemplate } from "./TodoItemTemplate.tsx";

function App() {
  const [todoItems, setTodoItems] = useState<TodoItemTemplate[]>([]);
  const [addingTodo, setAddingTodo] = useState(false);
  const [todoItem, setTodoItem] = useState<TodoItemTemplate>({
    id: 0,
    text: "",
    completed: false,
  });

  const handleAddTodo = () => {
    setAddingTodo(true);
  };

  const saveTodo = (todo: TodoItemTemplate) => {
    setTodoItems([...todoItems, todo]);
    setAddingTodo(false);
  };

  const addTodoItem = () => {
    const newTodoItem = {
      id: todoItems.length + 1,
      text: `Todo item ${todoItems.length + 1}`,
      completed: false,
    };

    setTodoItems([...todoItems, newTodoItem]);
  };

  return (
    <>
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
                        saveTodo({
                          id: todoItems.length + 1,
                          text: todoItem.text,
                          completed: false,
                        })}
                    >
                      Add todo
                    </button>
                  </div>
                )
                : <TodoItemList items={todoItems} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
