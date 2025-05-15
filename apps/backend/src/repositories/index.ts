import type {DrizzleD1Database} from "drizzle-orm/d1";
import * as schema from "../database/schema";
import {IUserRepository, userRepository} from "./user";

export type Client = DrizzleD1Database<typeof schema>

export interface IRepositories {
    user: IUserRepository;
}

export const repositories: (client: Client) => IRepositories = (
    client,
) => {
    return {
        user: userRepository(client),
    };
};