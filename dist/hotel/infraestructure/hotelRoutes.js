"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotelRoutes = void 0;
const express_1 = __importDefault(require("express"));
const depencies_1 = require("./depencies");
//import { validateToken } from '../../helpers/verifiqueToken';
exports.hotelRoutes = express_1.default.Router();
exports.hotelRoutes.post("/addHotel", depencies_1.createHotelController.run.bind(depencies_1.createHotelController));
// Middleware para verificar el token en las rutas siguientes
//userRoutes.use(validateToken);
exports.hotelRoutes.get("/all", depencies_1.getAllHotelsController.allUser.bind(depencies_1.getAllHotelsController));
exports.hotelRoutes.get("/:uuid", depencies_1.getByIdCoontroller.run.bind(depencies_1.getByIdCoontroller));
