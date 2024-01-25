import  express  from "express";
import { createRoomController, getRoomUuidController,getRoomsController, updateRoomController } from "./dependencies";



export const roomRoutes = express.Router();

roomRoutes.post("/create/", createRoomController.create.bind(createRoomController));

roomRoutes.get("/all", getRoomsController.get.bind(getRoomsController));

roomRoutes.get("/:uuid", getRoomUuidController.get.bind(getRoomUuidController));

roomRoutes.put("/update", updateRoomController.update.bind(updateRoomController));


