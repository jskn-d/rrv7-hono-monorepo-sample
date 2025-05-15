import {Context} from "hono";
import {createMiddleware} from "hono/factory";
import {drizzle} from "drizzle-orm/d1";
import {repositories} from "./repositories";
import * as schema from "./database/schema";
import {baseUseCases, UseCases} from "./usecases";


const createRepository = (c: Context) => {
    const db = drizzle(c.env.DB, { schema });
    return repositories(db);
}

export type SetUpEnv = {
    Variables: {
        useCases: UseCases;
    }
}

export const setup = createMiddleware<SetUpEnv>(async (c, next) => {
    const repositories = createRepository(c);
    const useCases = baseUseCases(repositories);
    c.set("useCases", useCases);
    await next();
});