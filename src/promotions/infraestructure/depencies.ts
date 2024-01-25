import { MysqlCouponRepository } from "./MysqlCouponlRepository";

import { CreateCouponUseCase } from "../application/createCouponUseCase";
import { GetAllCouponsUseCase } from "../application/getAllCouponsUseCase";

import { CreateCouponController } from "./controllers/createcouponController";
import { GetAllCouponsController } from "./controllers/getAllCouponsController";

import { GetByIdUseCase } from "../application/getByIdUseCase";
import { GetByIdCoontroller } from "./controllers/getByIdController";

import { CreateCouponUsageUseCase } from "../application/createCouponUsageUseCase"
import { CreateCouponUsageController } from "./controllers/createcouponUsageController"

import { GetAllCouponUsagesUseCase } from "../application/getcouponUsageUsecase"
import { GetAllCouponUsagesController } from "./controllers/getcouponUsageController"


export const mysqlCouponRepository = new MysqlCouponRepository();

export const createCouponUseCase = new CreateCouponUseCase(mysqlCouponRepository)
export const createCouponController = new CreateCouponController(createCouponUseCase)

export const getAllCouponsUseCase = new GetAllCouponsUseCase(mysqlCouponRepository);
export const getAllCouponsController = new GetAllCouponsController(getAllCouponsUseCase);

export const getByIdUseCase = new GetByIdUseCase(mysqlCouponRepository);
export const getByIdCoontroller = new GetByIdCoontroller(getByIdUseCase);

export const createCouponUsageUseCase = new CreateCouponUsageUseCase(mysqlCouponRepository);
export const createcouponUsageController = new CreateCouponUsageController(createCouponUsageUseCase);

export const getAllCouponUsagesUseCase = new GetAllCouponUsagesUseCase(mysqlCouponRepository);
export const getAllCouponUsagesController = new GetAllCouponUsagesController(getAllCouponUsagesUseCase);
