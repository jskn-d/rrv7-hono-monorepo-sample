import {userUseCase, UserUseCaseType} from "./user";
import {IRepositories} from "../repositories";

export interface UseCases {
    user: UserUseCaseType;
}

export const baseUseCases = (repo: IRepositories): UseCases => ({
    user: userUseCase(repo),
});