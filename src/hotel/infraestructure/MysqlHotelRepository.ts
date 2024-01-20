import { Hotel } from "../domain/hotel";
import { HotelRepository } from "../domain/hotelRepository";
import { query } from "../../database/msql";
import { isEmailRegistered } from "./validation/usermsql";
import { compare, encrypt } from '../../helpers/ashs';
import { tokenSigIn } from "../../helpers/token";


export class MysqlHotelRepository implements HotelRepository {
        async createHotel(
            uuid: string,
            price: number,
            description: string,
            room_type: string,
            availability: boolean
        ): Promise<Hotel | string | Error | null> {
            try {
                let sql = "INSERT INTO hotel(uuid, price, description, room_type, availability) VALUES ($1, $2, $3, $4, $5)";
                const params: any[] = [uuid, price, description, room_type, availability];
    
                console.log('Executing SQL:', sql);
                console.log('Parameters:', params);
    
                const result = await query(sql, params);
                console.log('Query Result:', result);
    
                // Asegúrate de que result tenga el formato esperado antes de intentar desestructurarlo
    
                return new Hotel(uuid, price, description, room_type, availability);
            } catch (error) {
                console.error("Error adding hotel:", error);
                return error as Error;
            }
        }
    
    
    async getAllHotels(): Promise<Hotel[] | null> {
        try {
            let sql = "SELECT * FROM hotel";
            const [result]: any = await query(sql);

            return result.map((row: any) => {
                return new Hotel(row.uuid, row.price, row.description, row.room_type, row.availability);
            });
        } catch (error) {
            console.error("Error getting hotels:", error);
            return null;
        }
    }

    async getById(uuid: string): Promise<Hotel | null> {
        try {
            let sql = "SELECT * FROM hotel WHERE uuid = ?";
            const [result]: any = await query(sql, [uuid]);

            if (result.length === 0) {
                return null;
            }

            const row = result[0];
            return new Hotel(row.uuid, row.price, row.description, row.room_type, row.availability);
        } catch (error) {
            console.error("Error getting hotel by id:", error);
            return null;
        }
    }
}