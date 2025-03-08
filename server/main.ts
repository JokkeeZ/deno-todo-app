import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";
import { oakCors } from "@tajpouria/cors";
import { DatabaseSync } from "node:sqlite";
import routeStaticFilesFrom from "./util/routeStaticFilesFrom.ts";

export const app = new Application();
const router = new Router();

const db = new DatabaseSync("todos.db");
db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    completed BOOLEAN NOT NULL
  );
`);

router.get("/api/todos/:id", (context) => {
});

router.post("/api/todos/", async (context) => {
});

router.delete("/api/todos/:id", async (context) => {
});

router.put("/api/todos/:id", async (context) => {
});

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(routeStaticFilesFrom([
  `${Deno.cwd()}/client/dist`,
  `${Deno.cwd()}/client/public`,
]));

if (import.meta.main) {
  console.log("Server listening on port http://localhost:3000");
  await app.listen({ port: 3000 });
}
