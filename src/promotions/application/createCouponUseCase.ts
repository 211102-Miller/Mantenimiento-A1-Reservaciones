import { Coupon } from "../domain/coupon";
import { CouponRepository } from "../domain/CouponRepository";
import { v4 as uuid } from 'uuid';
import { ValidatorCreateCoupon } from "../domain/validation/coupon";
import { validate } from "class-validator";

export class CreateCouponUseCase {
    constructor(readonly couponRepository: CouponRepository) {}

    async run(
        code: string,
        discount_percentage: number,
        initial_date: Date,
        expiration_date: Date,
        status: string
    ): Promise<Coupon | null | string | Error> {
        const myuuid: string = uuid();
        
        // Validator-class
        let coupon = new ValidatorCreateCoupon(code, discount_percentage, initial_date, expiration_date, status);
        const validation = await validate(coupon);
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const createdCoupon = await this.couponRepository.createCoupon(
                myuuid,
                code,
                discount_percentage,
                initial_date,
                expiration_date,
                status
            );

            return createdCoupon;
        } catch (error) {
            return null;
        }
    }
}
