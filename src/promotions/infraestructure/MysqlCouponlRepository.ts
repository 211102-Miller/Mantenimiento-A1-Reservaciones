import { Coupon } from "../domain/coupon";
import { CouponRepository } from "../domain/CouponRepository";
import { query } from "../../database/msql";

export class MysqlCouponRepository implements CouponRepository {
    async createCoupon(
        uuid: string,
        code: string,
        discount_percentage: number,
        initial_date: Date,
        expiration_date: Date,
        status: string
    ): Promise<Coupon | string | Error | null> {
        try {
            let sql = "INSERT INTO coupon(uuid, code, discount_percentage, initial_date, expiration_date, status) VALUES ($1, $2, $3, $4, $5, $6)";
            const params: any[] = [uuid, code, discount_percentage, initial_date, expiration_date, status];

            console.log('Executing SQL:', sql);
            console.log('Parameters:', params);

            const result = await query(sql, params);
            console.log('Query Result:', result);

            // Asegúrate de que result tenga el formato esperado antes de intentar desestructurarlo

            return new Coupon(uuid, code, discount_percentage, initial_date, expiration_date, status);
        } catch (error) {
            console.error("Error adding coupon:", error);
            return error as Error;
        }
    }

    async getAllCoupons(): Promise<Coupon[] | null> {
        try {
            let sql = "SELECT * FROM coupon";
            const [result]: any = await query(sql);

            return result.map((row: any) => {
                return new Coupon(row.uuid, row.code, row.discount_percentage, new Date(row.initial_date), new Date(row.expiration_date), row.status);
            });
        } catch (error) {
            console.error("Error getting coupons:", error);
            return null;
        }
    }

    async getById(uuid: string): Promise<Coupon | null> {
        try {
            let sql = "SELECT * FROM coupon WHERE uuid = $1";
            const [result]: any = await query(sql, [uuid]);

            if (result.length === 0) {
                return null;
            }

            const row = result[0];
            return new Coupon(row.uuid, row.code, row.discount_percentage, new Date(row.initial_date), new Date(row.expiration_date), row.status);
        } catch (error) {
            console.error("Error getting coupon by id:", error);
            return null;
        }
    }
}
