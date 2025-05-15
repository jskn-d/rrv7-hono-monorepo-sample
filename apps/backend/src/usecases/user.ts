import {z} from "zod";
import {createUserSchema} from "../repositories/user";
import type {IRepositories} from "../repositories";
import type {UserInferSelect} from "../database/schema";

export type UserUseCaseType = {
    create: (data: z.input<typeof createUserSchema>) => Promise<UserInferSelect>;
    getById: (id: number) => Promise<UserInferSelect | undefined>;
    getAll: () => Promise<UserInferSelect[]>;
}

export const userUseCase = (
    repo: IRepositories
): UserUseCaseType => {
    return {
        create: async (data) => repo.user.create(data),
        getById: async (id) => repo.user.getById(id),
        getAll: async () => repo.user.getAll(),
    };
};