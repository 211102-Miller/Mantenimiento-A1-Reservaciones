"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByIdCoontroller = exports.getByIdUseCase = exports.getAllHotelsController = exports.getAllHotelsUseCase = exports.createHotelController = exports.createHotelUseCase = exports.mysqlHotelRepository = void 0;
const MysqlHotelRepository_1 = require("./MysqlHotelRepository");
const createHotelUseCase_1 = require("../application/createHotelUseCase");
const getAllHotelsUseCase_1 = require("../application/getAllHotelsUseCase");
const createHotelController_1 = require("./controllers/createHotelController");
const getAllHotelsController_1 = require("./controllers/getAllHotelsController");
const getByIdUseCase_1 = require("../application/getByIdUseCase");
const getByIdController_1 = require("./controllers/getByIdController");
exports.mysqlHotelRepository = new MysqlHotelRepository_1.MysqlHotelRepository();
exports.createHotelUseCase = new createHotelUseCase_1.CreateHotelUseCase(exports.mysqlHotelRepository);
exports.createHotelController = new createHotelController_1.CreateHotelController(exports.createHotelUseCase);
exports.getAllHotelsUseCase = new getAllHotelsUseCase_1.GetAllHotelsUseCase(exports.mysqlHotelRepository);
exports.getAllHotelsController = new getAllHotelsController_1.GetAllHotelsController(exports.getAllHotelsUseCase);
exports.getByIdUseCase = new getByIdUseCase_1.GetByIdUseCase(exports.mysqlHotelRepository);
exports.getByIdCoontroller = new getByIdController_1.GetByIdCoontroller(exports.getByIdUseCase);
