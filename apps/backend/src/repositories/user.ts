import {eq} from "drizzle-orm";
import {createInsertSchema} from "drizzle-zod";
import {z} from "zod";
import {type UserInferSelect, usersTable} from "../database/schema";
import type {Client} from "./index";

const userZodSchema = createInsertSchema(usersTable, {
    id: z.string(),
    name: z.string().min(1, "user name min").max(100, "user name max"),
    email: z.string().email("email format")
});

export const createUserSchema = userZodSchema.pick({ name: true, email: true });
export const userIdSchema = userZodSchema.pick({ id: true });

export type IUserRepository = {
    create(data: z.input<typeof createUserSchema>): Promise<UserInferSelect>;
    getById(id: number): Promise<UserInferSelect | undefined>;
    getAll(): Promise<UserInferSelect[]>;
};

export const userRepository = (client: Client): IUserRepository => ({
    create: async (data) => {
        const parseData = await createUserSchema.parseAsync(data);
        return await client
            .insert(usersTable)
            .values(parseData)
            .returning()
            .get();
    },
    getById: async (id) => client
        .query
        .usersTable
        .findFirst({
            where: eq(usersTable.id, id)
        }),
    getAll: async() => client
        .query
        .usersTable
        .findMany()
});