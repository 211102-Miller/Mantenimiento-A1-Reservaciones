import { Coupon } from "./coupon";

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

}