import { Request, Response } from "express";
import { GetAllCouponsUseCase } from "../../application/getAllCouponsUseCase";

export class GetAllCouponsController {
    constructor(private getAllCouponsUseCase: GetAllCouponsUseCase) {}

    async run(req: Request, res: Response) {
        try {
            const listCoupons = await this.getAllCouponsUseCase.run();
            if (listCoupons) {
                return res.status(200).send({
                    status: "success",
                    data: {
                        listCoupons
                    }
                });
            } else {
                return res.status(200).send({
                    status: "ok",
                    message: "Coupons not found"
                });
            }
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "An error occurred while listing the coupons."
            });
        }
    }
}
