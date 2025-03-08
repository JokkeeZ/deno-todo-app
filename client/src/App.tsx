import { useState } from "react";
import TodoItem from "./TodoItem.tsx";

import "./App.css";

function App() {
  return (
    <>
      <div className="container">
        <h1 className="mt-3">Todo list</h1>

        <div className="grid mt-3">
          <div className="row justify-content-md-center">
            <div className="col col-lg-6">
              <button type="button" className="btn btn-success mx-1">Add new todo</button>
              <button type="button" className="btn btn-primary mx-1">Remove all todos</button>
            </div>
          </div>

          <div className="row justify-content-md-center mt-3">
            <div className="col col-lg-6">
              <div className="list-group">
                <TodoItem id={1} text="Buy groceries" completed={false} />
                <TodoItem id={2} text="Walk the dog" completed={true} />
                <TodoItem id={3} text="Wash the car" completed={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
