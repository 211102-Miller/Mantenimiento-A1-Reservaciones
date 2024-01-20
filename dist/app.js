"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const userRoutes_1 = require("./user/infraestructure/userRoutes");
const hotelRoutes_1 = require("./hotel/infraestructure/hotelRoutes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1/user', userRoutes_1.userRoutes);
app.use('/api/v1/hotel', hotelRoutes_1.hotelRoutes);
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Corriendo en el puerto ${port}`);
});
