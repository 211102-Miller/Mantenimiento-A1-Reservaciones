import { Usercoupon } from "../domain/usercoupon";
import { CouponRepository } from "../domain/CouponRepository";
import { ValidatorId } from "../domain/validation/coupon"; // Importa la clase ValidatorId
import { validate } from "class-validator"; // Importa la función validate

export class GetAllCouponUsagesUseCase {
    constructor(readonly couponUsageRepository: CouponRepository) {}

    async run(userUuid: string): Promise<Usercoupon[] | null> {
        let post = new ValidatorId(userUuid); 
        const validation = await validate(post); 
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const listCouponUsages = await this.couponUsageRepository.getAllCouponUsagesByUser(userUuid);
            return listCouponUsages;
        } catch (error) {
            return null;
        }
    }
}
