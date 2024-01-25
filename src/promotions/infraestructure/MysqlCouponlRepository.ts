import { Coupon } from "../domain/coupon";
import { CouponRepository } from "../domain/CouponRepository";
import { query } from "../../database/msql";
import { CouponUsage } from "../domain/couponUsage";
import { Usercoupon } from "../domain/usercoupon";



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
            const result = await query(sql);
    
            console.log("Tipo de resultado:", typeof result);
            console.log("Resultado:", result);
    
            if (!result || !Array.isArray(result.rows)) {
                console.log("El resultado no es un array o es nulo");
                return null;
            }
    
            return result.rows.map((row: any) => {
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

    //coupon usage
  
   
    
    async createCouponUsage(
        uuid: string,
        userUuid: string,
        roomUuid: string,
        couponUuid: string,
        usage_date: Date

    ): Promise<CouponUsage | string | Error | null> {
        try {
            const sql = "INSERT INTO coupon_usage(uuid, userUuid, couponUuid, usage_date) VALUES ($1, $2, $3, $4)";
            const params: any[] = [uuid, userUuid,roomUuid ,couponUuid, usage_date];

            console.log('Executing SQL:', sql);
            console.log('Parameters:', params);

            const result = await query(sql, params);
            console.log('Query Result:', result);

            // Asegúrate de que result tenga el formato esperado antes de intentar desestructurarlo

            return new CouponUsage(uuid, userUuid,roomUuid, couponUuid, usage_date);
        } catch (error) {
            console.error("Error adding coupon usage:", error);
            return error as Error;
        }
    }
    async getAllCouponUsagesByUser(userUuid: string): Promise<Usercoupon[] | null> {
        try {
            // Primera consulta para obtener userUuid, couponUuid, usage_date de coupon_usage
            const sqlCouponUsage = `
                SELECT userUuid, couponUuid, usage_date
                FROM coupon_usage
                WHERE userUuid = $1
            `;
            const resultCouponUsage = await query(sqlCouponUsage, [userUuid]);
    
            if (!resultCouponUsage || !Array.isArray(resultCouponUsage.rows)) {
                console.log("El resultado de coupon_usage no es un array o es nulo");
                return null;
            }
    
            // Segunda consulta para obtener discount_percentage de la tabla coupon usando couponUuid
            const usercoupons: Usercoupon[] = [];
            for (const row of resultCouponUsage.rows) {
                const { userUuid, couponUuid, usage_date } = row;
    
                const sqlCouponInfo = `
                    SELECT discount_percentage
                    FROM coupon
                    WHERE uuid = $1
                `;
                const resultCouponInfo = await query(sqlCouponInfo, [couponUuid]);
    
                if (!resultCouponInfo || resultCouponInfo.rows.length !== 1) {
                    console.log(`No se encontró información válida para el cupón con uuid: ${couponUuid}`);
                    continue;
                }
    
                const { discount_percentage } = resultCouponInfo.rows[0];
    
                // Ejemplo: Definir valores para bed, type y status
                const bed = "Cama individual";
                const type = "Tipo de habitación";
                const status = "Activo";
    
                // Calcular el costo usando price de la room y discount_percentage
                const price = 100; // Supongamos que aquí debes obtener el price de la room
                const costo = price * (1 - discount_percentage / 100);
            }
    
            return usercoupons;
        } catch (error) {
            console.error("Error getting coupon usages by user:", error);
            return null;
        }
    }
    

}