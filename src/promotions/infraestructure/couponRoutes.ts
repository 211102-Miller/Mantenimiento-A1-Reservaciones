import express from 'express';
import { createCouponController,
    getAllCouponsController,
    getByIdCoontroller,
    getAllCouponUsagesController,
    createcouponUsageController
} from './depencies';
//import { validateToken } from '../../helpers/verifiqueToken';

export const CouponRoutes = express.Router();



CouponRoutes.post("/addCoupon", createCouponController.run.bind(createCouponController))

// Middleware para verificar el token en las rutas siguientes
//userRoutes.use(validateToken);



CouponRoutes.get("/allCoupon", getAllCouponsController.run.bind(getAllCouponsController));

CouponRoutes.get("/:uuid", getByIdCoontroller.run.bind(getByIdCoontroller))


//couponusage
CouponRoutes.post("/:userUuid/:roomUuid/:couponUuid", createcouponUsageController.run.bind(createcouponUsageController))
CouponRoutes.get("/:uuid", getAllCouponUsagesController.run.bind(getAllCouponUsagesController));
