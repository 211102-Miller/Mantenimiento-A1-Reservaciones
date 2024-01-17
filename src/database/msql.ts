    // Aquí se ha corregido el nombre
    import mysql from "mysql2/promise";
    import { Signale } from "signale";

    const signale = new Signale();// Aquí se ha corregido el nombre


    const config = {
        host:'localhost',
        port: 3306, // // Agrega el puerto de la base de datos
        user:'root',
        database:'reservaciones',
        password:'Miller2001',
        waitForConnections: true,
        connectionLimit: 10,
    };


    // Crear el pool de conexiones
    const pool = mysql.createPool(config);

    export async function query(sql: string, params?: any[]) {
        try {
            const conn = await pool.getConnection();
            signale.success("Conexión exitosa a la BD");
            const result = await conn.execute(sql, params);
            conn.release();
            return result;
        } catch (error) {
            console.log(process.env.DB_HOST); // debería imprimir 'localhost'
            signale.error(error);
            return null;
        }
    }
