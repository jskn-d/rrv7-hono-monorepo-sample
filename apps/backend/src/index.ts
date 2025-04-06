import { Hono } from "hono";
import { cors } from "hono/cors";
import {drizzle} from "drizzle-orm/d1";
import {usersTable} from "./database/schema";
import {zValidator} from "@hono/zod-validator";
import {createUserSchema, userIdSchema} from "./types/users";
import {eq} from "drizzle-orm";

type Bindings = {
    DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>();

app.use("*", cors({
  origin: "*"
}));

app.get("/hello", (c) => {
  return c.json({ message: "Hello Hono!" })
});

app.get("/users", async (c) => {
  const db = drizzle(c.env.DB)
  const users = await db.select().from(usersTable).all();

  return c.json(users, 200);
});

app.post("users", zValidator("json", createUserSchema), async (c) => {
  const data = c.req.valid("json");
  const db = drizzle(c.env.DB);
  const parseData = await createUserSchema.parseAsync(data);
  const newUser = await db
      .insert(usersTable)
      .values(parseData)
      .returning()
      .get();

  return c.json(newUser, 201);
});

app.get("/users/:id", zValidator("param", userIdSchema), async (c) => {
  const param = c.req.valid("param");
  const db = drizzle(c.env.DB);
  const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, Number(param.id)))
      .get();

  if (!user) {
    return c.json({ message: "User not found" }, 404);
  }

  return c.json(user, 200);
});

app.put("/users/:id", zValidator("param", userIdSchema), zValidator("json", createUserSchema), async (c) => {
  const param = c.req.valid("param");
  const data = c.req.valid("json");
  const db = drizzle(c.env.DB);
  const parseData = await createUserSchema.parseAsync(data);
    const user = await db
        .update(usersTable)
        .set(parseData)
        .where(eq(usersTable.id, Number(param.id)))
        .returning()
        .get();

    if (!user) {
        return c.json({ message: "User not found" }, 404);
    }

    return c.json(user, 200);
});

app.delete("/users/:id", zValidator("param", userIdSchema), async (c) => {
  const param = c.req.valid("param");
  const db = drizzle(c.env.DB);
  const user = await db
      .delete(usersTable)
      .where(eq(usersTable.id, Number(param.id)))
      .returning()
      .get();

  if (!user) {
    return c.json({ message: "User not found" }, 404);
  }

  return c.newResponse(null, { status: 204 });
});

export type AppType = typeof app;
export default app;