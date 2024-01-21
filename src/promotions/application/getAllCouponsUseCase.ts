import { Coupon } from "../domain/coupon";
import { CouponRepository} from "../domain/CouponRepository";

export class GetAllCouponsUseCase{
    constructor(readonly hotelRepository: CouponRepository){}


    async getAll():Promise<Coupon[] | null>{
        try {
            const listUsers = await this.hotelRepository.getAllCoupons();
            return listUsers; 
        } catch (error) {
            return null;        }
    }
}