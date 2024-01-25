import express  from "express";
import { createReservationController, updateReservationController } from "./dependencies";


export const reservationRouter = express.Router();


reservationRouter.post("/create", createReservationController.create.bind(createReservationController));

reservationRouter.put("/put", updateReservationController.update.bind(updateReservationController));

