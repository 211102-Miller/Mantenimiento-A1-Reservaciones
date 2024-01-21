import express from 'express';
import { createHotelController,
    getAllHotelsController,
    getByIdCoontroller,
} from './depencies';
//import { validateToken } from '../../helpers/verifiqueToken';

export const CouponRoutes = express.Router();



CouponRoutes.post("/addCoupon", createHotelController.run.bind(createHotelController))

// Middleware para verificar el token en las rutas siguientes
//userRoutes.use(validateToken);



CouponRoutes.get("/allCoupon", getAllHotelsController.allUser.bind(getAllHotelsController));

CouponRoutes.get("/:uuid", getByIdCoontroller.run.bind(getByIdCoontroller))
