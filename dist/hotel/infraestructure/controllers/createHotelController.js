"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateHotelController = void 0;
const hotel_1 = require("../../domain/hotel");
class CreateHotelController {
    constructor(createHotelUseCase) {
        this.createHotelUseCase = createHotelUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('controller');
            try {
                const { uuid, price, description, room_type, availability } = req.body;
                console.log(req.body);
                const createdHotel = yield this.createHotelUseCase.run(price, description, room_type, availability);
                if (createdHotel instanceof hotel_1.Hotel) {
                    return res.status(201).send({
                        status: "success",
                        data: {
                            uuid: createdHotel.uuid,
                            price: createdHotel.price,
                            description: createdHotel.description,
                            room_type: createdHotel.room_type,
                            availability: createdHotel.availability,
                        },
                    });
                }
                else {
                    return res.status(500).send({
                        status: "error",
                        message: "An unexpected error occurred while creating the hotel.",
                    });
                }
            }
            catch (error) {
                // Manejo de errores específicos
                if (error instanceof Error) {
                    if (error.message.includes('Duplicate entry') && error.message.includes('for key \'users.email\'')) {
                        return res.status(409).send({
                            status: "error",
                            message: "The email address is already in use. Please use a different email address.",
                        });
                    }
                    else if (error.message.startsWith('[')) { // Suponiendo que los errores de validación comienzan con un corchete
                        return res.status(400).send({
                            status: "error",
                            message: "Validation failed",
                            errors: JSON.parse(error.message) // Convertimos el mensaje de error en un objeto
                        });
                    }
                }
                // Para errores generales, se devuelve un error 500 con un mensaje genérico
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred. Please try again later.",
                });
            }
        });
    }
}
exports.CreateHotelController = CreateHotelController;
