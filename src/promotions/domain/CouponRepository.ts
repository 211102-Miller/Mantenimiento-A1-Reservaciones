import { Coupon } from "./coupon";
import { CouponUsage } from "./couponUsage";
import { Usercoupon } from "./usercoupon";

export interface CouponRepository{
    createCoupon( 
        uuid: string,
        code: string,
        discount_percentage: number,
        initial_date: Date,
        expiration_date: Date,
        status: string
    ): Promise<Coupon | null | string | Error> ;

    getAllCoupons():Promise<Coupon[] | null>

    getById(uuid:string):Promise<Coupon | null>
//coupon usage
createCouponUsage(
    uuid: string,
    userUuid: string,
    roomUuid: string,
    couponUuid: string,
    usage_date: Date
): Promise<CouponUsage | null | string | Error>;

getAllCouponUsagesByUser(userUuid: string): Promise<Usercoupon[] | null>;

}