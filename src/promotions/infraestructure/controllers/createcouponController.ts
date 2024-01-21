import { Request, Response } from "express";
import { CreateCouponUseCase } from "../../application/createCouponUseCase";
import { Coupon } from "../../domain/coupon";

export class CreateCouponController {
    constructor(readonly createCouponUseCase: CreateCouponUseCase) { }

    async run(req: Request, res: Response) {
        console.log('controller');

        try {
            const { code, discount_percentage, initial_date, expiration_date, status } = req.body;
            console.log(req.body);

            const createdCoupon = await this.createCouponUseCase.run(
                code,
                discount_percentage,
                initial_date,
                expiration_date,
                status
            );

            if (createdCoupon instanceof Coupon) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        code: createdCoupon.code,
                        discount_percentage: createdCoupon.discount_percentage,
                        initial_date: createdCoupon.initial_date,
                        expiration_date: createdCoupon.expiration_date,
                        status: createdCoupon.status,
                    },
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while creating the coupon.",
                });
            }
        } catch (error) {
            // Manejo de errores específicos
            if (error instanceof Error) {
                if (error.message.includes('Duplicate entry') && error.message.includes('for key \'users.email\'')) {
                    return res.status(409).send({
                        status: "error",
                        message: "The coupon code is already in use. Please use a different code.",
                    });
                } else if (error.message.startsWith('[')) {  // Suponiendo que los errores de validación comienzan con un corchete
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message)  // Convertimos el mensaje de error en un objeto
                    });
                }
            }

            // Para errores generales, se devuelve un error 500 con un mensaje genérico
            return res.status(500).send({
                status: "error",
                message: "An unexpected error occurred. Please try again later.",
            });
        }
    }
}
