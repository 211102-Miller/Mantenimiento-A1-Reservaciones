import { Coupon } from "../domain/coupon";
import { CouponRepository } from "../domain/CouponRepository";
import { validate } from "class-validator";
import { ValidatorId } from "../domain/validation/coupon";



export class GetByIdUseCase{
    constructor(readonly userRepository:CouponRepository ){}

    async getId(uuid:string):Promise<Coupon | null>{

        let post = new ValidatorId(uuid)
        const validation = await validate(post)
        console.log(validation.length)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const getUserById = await this.userRepository.getById(uuid);
            return getUserById;
        } catch (error) {
            return null
        }
    }
}