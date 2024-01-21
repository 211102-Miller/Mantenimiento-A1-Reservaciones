import { MysqlCouponRepository } from "./MysqlCouponlRepository";

import { CreateCouponUseCase } from "../application/createCouponUseCase";
import { GetAllCouponsUseCase } from "../application/getAllCouponsUseCase";

import { CreateCouponController } from "./controllers/createcouponController";
import { GetAllCouponsController } from "./controllers/getAllHotelsController";

import { GetByIdUseCase } from "../application/getByIdUseCase";
import { GetByIdCoontroller } from "./controllers/getByIdController";




export const mysqlHotelRepository = new MysqlCouponRepository();

export const createCouponUseCase = new CreateCouponUseCase(mysqlHotelRepository)
export const createHotelController = new CreateCouponController(createCouponUseCase)

export const getAllHotelsUseCase = new GetAllCouponsUseCase(mysqlHotelRepository);
export const getAllHotelsController = new GetAllCouponsController(getAllHotelsUseCase);

export const getByIdUseCase = new GetByIdUseCase(mysqlHotelRepository);
export const getByIdCoontroller = new GetByIdCoontroller(getByIdUseCase);
