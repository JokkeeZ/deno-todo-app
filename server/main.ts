import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";
import { oakCors } from "@tajpouria/cors";
import routeStaticFilesFrom from "./util/routeStaticFilesFrom.ts";
import { DatabaseSync } from "node:sqlite";
import { Todo } from "../client/src/TodoItem.tsx";

const router = new Router();

const db = new DatabaseSync("todos.db");
db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    completed BOOLEAN NOT NULL
  );
`);

router.get("/api/todos", (context) => {
  const todos = db.prepare("SELECT * FROM todos;").all();

  // deno-lint-ignore no-explicit-any
  context.response.body = todos.map((todo: any) => ({
    ...todo,
    completed: todo.completed === "true",
  })) as Todo[];
});

router.post("/api/todos", async (context) => {
  const { text, completed } = await context.request.body.json();

  const { lastInsertRowid, changes } = db
    .prepare("INSERT INTO todos (text, completed) VALUES (?, ?);")
    .run(text, completed.toString());

  if (changes === 0) {
    context.response.body = { success: false };
    return;
  }

  context.response.body = { success: true, id: lastInsertRowid };
});

router.delete("/api/todos/delete/:id", (context) => {
  const { id } = context.params;
  console.log("delete requested for id:", id);
  const { changes } = db.prepare("DELETE FROM todos WHERE id = ?;").run(id);

  context.response.body = { success: changes > 0 };
});

router.delete("/api/todos/clear", (context) => {
  console.log('delete all');
  const { changes } = db.prepare("DELETE FROM todos;").run();
  context.response.body = { success: changes > 0 };
});

router.put("/api/todos", async (context) => {
  const { id, text, completed } = await context.request.body.json();

  const { changes } = db
    .prepare("UPDATE todos SET text = ?, completed = ? WHERE id = ?;")
    .run(text, completed.toString(), id);

  console.log(id, text, completed);

  context.response.body = { success: changes > 0 };
});

export const app = new Application();

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(
  routeStaticFilesFrom([
    `${Deno.cwd()}/client/dist`,
    `${Deno.cwd()}/client/public`,
  ]),
);

if (import.meta.main) {
  await app.listen({ port: 8000 });
}
