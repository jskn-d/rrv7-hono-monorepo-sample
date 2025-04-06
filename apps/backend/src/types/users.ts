import {createInsertSchema} from "drizzle-zod";
import {usersTable} from "../database/schema";
import {z} from "zod";

const userZodSchema = createInsertSchema(usersTable, {
    id: z.string(),
    name: z.string().min(1, "user name min").max(100, "user name max"),
    email: z.string().email("email format")
});

export const createUserSchema = userZodSchema.pick({ name: true, email: true });
export const userIdSchema = userZodSchema.pick({ id: true });
