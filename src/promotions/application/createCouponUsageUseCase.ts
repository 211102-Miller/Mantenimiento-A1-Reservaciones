import { CouponUsage } from "../domain/couponUsage";
import { CouponRepository } from "../domain/CouponRepository";
import { v4 as uuid } from 'uuid';
import { ValidatorCreateCouponUsage } from "../domain/validation/coupon";
import { validate } from "class-validator";

export class CreateCouponUsageUseCase {
    constructor(readonly couponUsageRepository: CouponRepository) {}

    async run(
        userUuid: string,
        roomUuid: string,
        couponUuid: string,
        usage_date: Date
    ): Promise<CouponUsage | null | string | Error> {
        const myuuid: string = uuid();

        // Validator-class
        let couponUsage = new ValidatorCreateCouponUsage(myuuid, userUuid,roomUuid, couponUuid, usage_date);
        const validation = await validate(couponUsage);
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const createdCouponUsage = await this.couponUsageRepository.createCouponUsage(
                myuuid,
                userUuid,
                roomUuid,
                couponUuid,
                usage_date
            );

            return createdCouponUsage;
        } catch (error) {
            return null;
        }
    }
}
