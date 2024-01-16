import { MysqlUserRepository } from "./mysqlUserRepository";

import { CreateUserUseCase } from "../application/createUserUseCase";
import { GetAllUsersUseCase } from "../application/getAllUsersUseCase";

import { CreateUserController } from "./controllers/createUserController";
import { GetAllUsersController } from "./controllers/getAllUsersController";

import { GetByIdUseCase } from "../application/getByIdUseCase";
import { GetByIdCoontroller } from "./controllers/getByIdController";

import { UpdateUserByIdUseCase } from "../application/updateUserByIdUseCase";
import { UpdateUserByIdController } from "./controllers/updateUserByIdController";

import { DeleteUserUseCase } from "../application/deleteUserUseCase";
import { DeleteUserController } from "./controllers/deleteUserController";

import { UpdatePasswordUseCase } from "../application/updatePasswordUseCase";
import { UpdatePasswordController } from "./controllers/updatePasswordController";

import { LoginUserUseCase } from "../application/loginUserUseCase";
import { LoginUserController } from "./controllers/loginUserController";

import { GetUserByFilterUseCase } from "../application/getUserByFilterUseCase";
import { GetUserByFilterController } from "./controllers/getUserByFilterController";

import { GetByEmialUseCase } from "../application/getByEmailUseCase";
import { GetByEmailController } from "./controllers/getByEmailController";


export const mysqlUserRepository = new MysqlUserRepository();

export const createUserUseCase = new CreateUserUseCase(mysqlUserRepository)
export const createUserController = new CreateUserController(createUserUseCase)

export const getAllUsersUseCase = new GetAllUsersUseCase(mysqlUserRepository);
export const getAllUsersController = new GetAllUsersController(getAllUsersUseCase);

export const getByIdUseCase = new GetByIdUseCase(mysqlUserRepository);
export const getByIdCoontroller = new GetByIdCoontroller(getByIdUseCase);

export const updateUserByIdUseCase = new UpdateUserByIdUseCase(mysqlUserRepository);
export const updateUserByIdController = new UpdateUserByIdController (updateUserByIdUseCase);

export const deleteUserUseCase = new DeleteUserUseCase(mysqlUserRepository);
export const deleteUserController = new DeleteUserController(deleteUserUseCase);

export const updatePasswordUseCase = new UpdatePasswordUseCase(mysqlUserRepository);
export const updatePasswordController = new UpdatePasswordController(updatePasswordUseCase);

export const getUserByFilterUseCase = new GetUserByFilterUseCase(mysqlUserRepository);
export const getUserByFilterController = new GetUserByFilterController(getUserByFilterUseCase);

export const getByEmialUseCase = new GetByEmialUseCase(mysqlUserRepository);
export const getByEmailController = new GetByEmailController(getByEmialUseCase);

export const loginUserUseCase = new LoginUserUseCase(mysqlUserRepository);
export const loginUserController = new LoginUserController(loginUserUseCase,getByEmialUseCase);

