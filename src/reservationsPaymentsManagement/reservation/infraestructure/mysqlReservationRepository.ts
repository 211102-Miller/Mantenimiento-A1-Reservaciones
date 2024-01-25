import { query } from "../../../database/msql";
import { Reservation } from "../domain/reservation";
import { ReservationRepository } from "../domain/reservationRepository";

export class MysqlReservationRepository implements ReservationRepository {
    
    async createReservation(uuid: string, userUuid: string, roomUuid: string, paymentUuid: string, arrive_date: string, departure_date: string, status: string): Promise<string | Error | Reservation | null> {
        try {
            // Insertar en la tabla reservations
            let sql = "INSERT INTO reservations (uuid, userUuid, roomUuid, paymentUuid, arrive_date, departure_date, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
            const params: any[] = [uuid, userUuid, roomUuid, paymentUuid, arrive_date, departure_date, status];
            await query(sql, params);

            // Actualizar el estado de la habitación en la tabla rooms
            sql = "UPDATE rooms SET status = 'ocupado' WHERE uuid = ?";
            const roomUpdateParams: any[] = [roomUuid];
            await query(sql, roomUpdateParams);

            return new Reservation(uuid, userUuid, roomUuid, paymentUuid, arrive_date, departure_date, status);
        } catch (error) {
            console.error("Error adding review:", error);
            return error as Error;
        }
    }
    
    async updateReservation(uuid: string, arrive_date?: string, departure_date?: string, status?: string): Promise<string | Reservation | Error | null> {
        const updates: { [key: string]: any } = {};
        
        if (arrive_date !== undefined) updates.arrive_date = arrive_date;
        if (departure_date !== undefined) updates.departure_date = departure_date;
        if (status !== undefined) updates.status = status;
    
        const keys = Object.keys(updates);
        if (keys.length === 0) return null; // No hay nada que actualizar.
    
        const sqlParts = keys.map(key => `${key} = ?`);
        const sql = `UPDATE reservations SET ${sqlParts.join(', ')} WHERE uuid = ?`;
    
        try {
            const values = keys.map(key => updates[key]);
            values.push(uuid); // Añade el UUID al final del array de valores.
            await query(sql, values); // Ejecuta la consulta SQL.
    
            const [updatedRows]: any = await query('SELECT * FROM reservations WHERE uuid = ?', [uuid]);
            if (!updatedRows || updatedRows.length === 0) {
                throw new Error('No reservation found with the provided UUID.');
            }
    
            const updatedReservation = {
                uuid: updatedRows[0].uuid,
                userUuid:updatedRows.userUuid,
                roomUuid:updatedRows.roomRepository,
                paymentUuid:updatedRows.paymentUuid,
                arrive_date: updatedRows[0].arrive_date,
                departure_date: updatedRows[0].departure_date,
                status: updatedRows[0].status,
            };
    
            return updatedReservation;
        } catch (error) {
            console.error('Error updating reservation:', error);
            throw error; // O maneja el error de la manera que prefieras.
        }
    }
}
