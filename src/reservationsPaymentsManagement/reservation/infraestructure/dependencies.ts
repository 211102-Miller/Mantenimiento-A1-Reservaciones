import { MysqlReservationRepository } from "./mysqlReservationRepository";

import { CreateReservationUseCase } from "../application/createReservationUseCase";
import { CreateRervationController } from "./controllers/createReservationController";
import { UpdateReservationUseCase } from "../application/updateReservationUseCase";
import { UpdateReservationController } from "./controllers/updateReservationController";

export const  mysqlReservationRepository = new MysqlReservationRepository();

export const createReservationUseCase = new CreateReservationUseCase(mysqlReservationRepository);
export const createReservationController = new CreateRervationController(createReservationUseCase);

export const updateReservationUseCase = new UpdateReservationUseCase(mysqlReservationRepository);
export const updateReservationController = new UpdateReservationController(updateReservationUseCase);