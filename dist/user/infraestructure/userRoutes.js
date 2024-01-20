"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const depencies_1 = require("./depencies");
const verifiqueToken_1 = require("../../helpers/verifiqueToken");
exports.userRoutes = express_1.default.Router();
exports.userRoutes.post("/login", depencies_1.loginUserController.run.bind(depencies_1.loginUserController));
exports.userRoutes.post("/register", depencies_1.createUserController.run.bind(depencies_1.createUserController));
// Middleware para verificar el token en las rutas siguientes
exports.userRoutes.use(verifiqueToken_1.validateToken);
exports.userRoutes.get("/email", depencies_1.getByEmailController.get.bind(depencies_1.getByEmailController));
exports.userRoutes.get("/all", depencies_1.getAllUsersController.allUser.bind(depencies_1.getAllUsersController));
exports.userRoutes.get("/:uuid", depencies_1.getByIdCoontroller.run.bind(depencies_1.getByIdCoontroller));
exports.userRoutes.put("/update", depencies_1.updateUserByIdController.update.bind(depencies_1.updateUserByIdController));
exports.userRoutes.delete("/:uuid", depencies_1.deleteUserController.deleteUser.bind(depencies_1.deleteUserController));
exports.userRoutes.put("/new_password", depencies_1.updatePasswordController.run.bind(depencies_1.updatePasswordController));
exports.userRoutes.get("/filters/a", depencies_1.getUserByFilterController.run.bind(depencies_1.getUserByFilterController));
