import { Room } from "../domain/room";
import { RoomRepository } from "../domain/roomRepository";
import { query } from "../../../database/msql";


export class MysqlRoomRepository implements RoomRepository{

    async createRoom(uuid: string, bed: string, type: string, status: string, price: number): Promise<string | Room | null | Error> {
        try {
            let sql = "INSERT INTO rooms (uuid, bed, type, status, price) VALUES (?, ?, ?, ?, ?)";
            const params : any[] = [uuid,bed,type,status, price];
            const [result]: any = await query(sql, params);
            return new Room(uuid,bed,type,status,price);
        } catch (error) {
            console.error("Error adding reviwe:", error);
            return error as Error;
        }    
    }

    async getRoomUuid(uuid: string): Promise<string | Room | Error | null> {
        try {
            const sql = "SELECT * FROM rooms WHERE uuid = ? LIMIT 1"; // SQL para obtener un usuario por uuid
            const [rows]: any = await query(sql, [uuid]); // Ejecutamos la consulta, pasando el uuid como parámetro

            if (!rows || rows.length === 0) return null; // Si no hay resultados, retornamos null        
            const row = rows[0]; // Tomamos el primer resultado (ya que uuid debería ser único)
            // Retornamos una nueva instancia de User con los datos obtenidos
            return new Room(row.uuid, row.bed, row.type,row.status, row.price);
        } catch (error) {
            console.error(error);
            return null; // En caso de error, retornamos null
        }
    }

    async getRooms(): Promise<string | Error | Room[] | null> {
        try {
            const sql = "SELECT * FROM rooms";
            const [rows]: any = await query(sql); // Esto probablemente devuelve un tipo de dato más complejo
            if (!Array.isArray(rows)) {
                throw new Error('Rows is not an array'); // o maneja este caso como prefieras
            }
            const rooms: Room[] = rows.map(row => new Room(row.uuid, row.bed, row.type,row.status, row.price));
            return rooms
        } catch (error) {
            console.error(error);
            return null; // retornas null o podrías optar por retornar un array vacío dependiendo de tu lógica de negocio
        }
    }
    
    async updateRoom(uuid: string, bed?: string, type?: string, status?: string, price?: number): Promise<string | Room | Error | null> {
        const updates: { [key: string]: any } = {};
        
        if (bed !== undefined) updates.bed = bed;
        if (type !== undefined) updates.type = type;
        if (status !== undefined) updates.status = status;
        if (price !== undefined) updates.price = price;
    
        const keys = Object.keys(updates);
        if (keys.length === 0) return null; // No hay nada que actualizar.
    
        const sqlParts = keys.map(key => `${key} = ?`);
        const sql = `UPDATE rooms SET ${sqlParts.join(', ')} WHERE uuid = ?`;
    
        try {
            const values = keys.map(key => updates[key]);
            values.push(uuid); // Añade el UUID al final del array de valores.
            await query(sql, values); // Ejecuta la consulta SQL.
    
            const [updatedRows]: any = await query('SELECT * FROM rooms WHERE uuid = ?', [uuid]);
            if (!updatedRows || updatedRows.length === 0) {
                throw new Error('No room found with the provided UUID.');
            }
    
            const updatedRoom = {
                uuid: updatedRows[0].uuid,
                bed: updatedRows[0].bed,
                type: updatedRows[0].type,
                status: updatedRows[0].status,
                price: updatedRows[0].price,
            };
    
            return updatedRoom;
        } catch (error) {
            console.error('Error updating room:', error);
            throw error; // O maneja el error de la manera que prefieras.
        }
    }
}