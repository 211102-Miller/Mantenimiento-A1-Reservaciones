import { MysqlRoomRepository } from "./mysqlRoomRepository";

import { CreateRoomUseCase } from "../application/createRoomUseCase";
import { CreateRoomController } from "./controllers/createRoomController";
import { GetRoomUuidUseCase } from "../application/getRoomUuidUseCase";
import { GetRoomUuidController } from "./controllers/getRoomUuidController";
import { GetRoomsUseCase } from "../application/getRoomsUseCase";
import { GetRoomsController } from "./controllers/getRoomsController";
import { UpdateRoomUseCase } from "../application/updateRoomUseCase";
import { UpdateRoomController } from "./controllers/updateRoomController";

export const mysqlRoomRepository = new MysqlRoomRepository();

export const createRoomUseCase = new CreateRoomUseCase(mysqlRoomRepository);
export const createRoomController = new CreateRoomController(createRoomUseCase);

export const getRoomUuidUseCase = new GetRoomUuidUseCase(mysqlRoomRepository);
export const getRoomUuidController = new GetRoomUuidController(getRoomUuidUseCase);

export const getRoomsUseCase = new GetRoomsUseCase(mysqlRoomRepository);
export const getRoomsController = new GetRoomsController(getRoomsUseCase);

export const updateRoomUseCase = new UpdateRoomUseCase(mysqlRoomRepository);
export const updateRoomController = new UpdateRoomController(updateRoomUseCase);
