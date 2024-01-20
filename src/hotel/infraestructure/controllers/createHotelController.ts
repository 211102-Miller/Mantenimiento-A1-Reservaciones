import { Request, Response } from "express";
import { CreateHotelUseCase } from "../../application/createHotelUseCase";
import { Hotel } from "../../domain/hotel";

export class CreateHotelController {
    constructor(readonly createHotelUseCase: CreateHotelUseCase) { }

    async run(req: Request, res: Response) {
        console.log('controller');

        try {
            const { uuid, price, description, room_type, availability } = req.body;
            console.log(req.body);

            const createdHotel = await this.createHotelUseCase.run(
                price,
                description,
                room_type,
                availability
            );

            if (createdHotel instanceof Hotel) {
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
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while creating the hotel.",
                });
            }
        } catch (error) {
            // Manejo de errores específicos
            if (error instanceof Error) {
                if (error.message.includes('Duplicate entry') && error.message.includes('for key \'users.email\'')) {
                    return res.status(409).send({
                        status: "error",
                        message: "The email address is already in use. Please use a different email address.",
                    });
                } else if (error.message.startsWith('[')) {  // Suponiendo que los errores de validación comienzan con un corchete
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message)  // Convertimos el mensaje de error en un objeto
                    });
                }            }

            // Para errores generales, se devuelve un error 500 con un mensaje genérico
            return res.status(500).send({
                status: "error",
                message: "An unexpected error occurred. Please try again later.",
            });
        }
    }
}
