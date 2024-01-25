// CreateCouponUsageController.ts

import { Request, Response } from "express";
import { CreateCouponUsageUseCase } from "../../application/createCouponUsageUseCase";
import { CouponUsage } from "../../domain/couponUsage";

export class CreateCouponUsageController {
    constructor(readonly createCouponUsageUseCase: CreateCouponUsageUseCase) { }

    async run(req: Request, res: Response) {
        console.log('controller');

        try {
            const { userUuid, roomUuid,couponUuid } = req.params;

            // Obtener la fecha y hora actual en formato ISO
            const usage_date = new Date();

            console.log('userUuid:', userUuid);
            console.log('couponUuid:', couponUuid);
            console.log('usage_date:', usage_date);

            const createdCouponUsage = await this.createCouponUsageUseCase.run(
                userUuid,
                roomUuid,
                couponUuid,
                usage_date
            );

            if (createdCouponUsage instanceof CouponUsage) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        uuid: createdCouponUsage.uuid,
                        userUuid: createdCouponUsage.userUuid,
                        couponUuid: createdCouponUsage.couponUuid,
                        usage_date: createdCouponUsage.usage_date,
                    },
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while creating the coupon usage.",
                });
            }
        } catch (error) {
            // Manejo de errores específicos
            if (error instanceof Error) {
                if (error.message.startsWith('[')) {  // Suponiendo que los errores de validación comienzan con un corchete
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
