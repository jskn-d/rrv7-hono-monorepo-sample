import { Hono } from "hono";
import { cors } from "hono/cors";
import {zValidator} from "@hono/zod-validator";
import {userIdSchema, createUserSchema} from "./repositories/user";
import {setup, SetUpEnv} from "./middlewares";

const app = new Hono<SetUpEnv>();

app.use("*", cors({
  origin: "*"
}));

const route = app
    .use(setup)
    .get("/hello", (c) => {
        return c.json({ message: "Hello Hono!" })
    })
    .get("/users", async (c) => {
        const users = await c.var.useCases.user.getAll();
        return c.json(users, 200);
    })
    .post("users", zValidator("json", createUserSchema), async (c) => {
      const data = c.req.valid("json");
      const parseData = await createUserSchema.parseAsync(data);
      const newUser = await c.var.useCases.user.create(parseData);
      return c.json(newUser, 201);
    })
    .get("/users/:id", zValidator("param", userIdSchema), async (c) => {
        const param = c.req.valid("param");
        const user = c.var.useCases.user.getById(Number(param.id));
        if (!user) {
          return c.json({ message: "User not found" }, 404);
        }
        return c.json(user, 200);
    })

export type AppType = typeof route;
export default app;