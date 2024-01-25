import { Request, Response } from "express";
import { GetAllCouponUsagesUseCase } from "../../application/getcouponUsageUsecase";

export class GetAllCouponUsagesController {
    constructor(readonly getAllCouponUsagesUseCase: GetAllCouponUsagesUseCase) {}

    async run(req: Request, res: Response) {
        try {
            // Obtener el userUuid de los parámetros de la solicitud
            const { userUuid } = req.params;

            // Llamar al caso de uso para obtener todos los usos de cupones para el usuario
            const couponUsages = await this.getAllCouponUsagesUseCase.run(userUuid as string);

            if (couponUsages !== null) {
                return res.status(200).send({
                    status: "success",
                    data: {
                        couponUsages: couponUsages
                    }
                });
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "Coupon usages not found."
                });
            }
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.startsWith('[')) {
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message)
                    });
                }
            }
            return res.status(500).send({
                status: "error",
                message: "An error occurred while getting coupon usages."
            });
        }
    }
}
