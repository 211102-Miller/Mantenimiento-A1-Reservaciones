import { MysqlHotelRepository } from "./MysqlHotelRepository";

import { CreateHotelUseCase } from "../application/createHotelUseCase";
import { GetAllHotelsUseCase } from "../application/getAllHotelsUseCase";

import { CreateHotelController } from "./controllers/createHotelController";
import { GetAllHotelsController } from "./controllers/getAllHotelsController";

import { GetByIdUseCase } from "../application/getByIdUseCase";
import { GetByIdCoontroller } from "./controllers/getByIdController";




export const mysqlHotelRepository = new MysqlHotelRepository();

export const createHotelUseCase = new CreateHotelUseCase(mysqlHotelRepository)
export const createHotelController = new CreateHotelController(createHotelUseCase)

export const getAllHotelsUseCase = new GetAllHotelsUseCase(mysqlHotelRepository);
export const getAllHotelsController = new GetAllHotelsController(getAllHotelsUseCase);

export const getByIdUseCase = new GetByIdUseCase(mysqlHotelRepository);
export const getByIdCoontroller = new GetByIdCoontroller(getByIdUseCase);
