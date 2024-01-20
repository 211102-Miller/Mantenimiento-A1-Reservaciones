import express from 'express';
import { createHotelController,
    getAllHotelsController,
    getByIdCoontroller,
} from './depencies';
//import { validateToken } from '../../helpers/verifiqueToken';

export const hotelRoutes = express.Router();



hotelRoutes.post("/addHotel", createHotelController.run.bind(createHotelController))

// Middleware para verificar el token en las rutas siguientes
//userRoutes.use(validateToken);



hotelRoutes.get("/all", getAllHotelsController.allUser.bind(getAllHotelsController));

hotelRoutes.get("/:uuid", getByIdCoontroller.run.bind(getByIdCoontroller))
