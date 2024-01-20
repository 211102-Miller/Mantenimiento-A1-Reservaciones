"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlUserRepository = void 0;
const user_1 = require("../domain/user");
const msql_1 = require("../../database/msql");
const ashs_1 = require("../../helpers/ashs");
const token_1 = require("../../helpers/token");
class MysqlUserRepository {
    createUser(uuid, name, last_name, phone_number, email, password, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sql = "INSERT INTO users(uuid, name, last_name, phone_number, email, password, status) VALUES ($1, $2, $3, $4, $5, $6, $7)";
                const params = [uuid, name, last_name, phone_number, email, password, status];
                console.log('Executing SQL:', sql);
                console.log('Parameters:', params);
                const result = yield (0, msql_1.query)(sql, params);
                console.log('Query Result:', result);
                // Asegúrate de que result tenga el formato esperado antes de intentar desestructurarlo
                return new user_1.User(uuid, name, last_name, phone_number, email, password, status);
            }
            catch (error) {
                console.error("Error adding user:", error);
                return error;
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM users";
                const [rows] = yield (0, msql_1.query)(sql); // Esto probablemente devuelve un tipo de dato más complejo
                if (!Array.isArray(rows)) {
                    throw new Error('Rows is not an array'); // o maneja este caso como prefieras
                }
                const users = rows.map(row => new user_1.User(row.uuid, row.name, row.last_name, row.phone_number, row.email, row.password, row.status));
                return users;
            }
            catch (error) {
                console.error(error);
                return null; // retornas null o podrías optar por retornar un array vacío dependiendo de tu lógica de negocio
            }
        });
    }
    getById(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM users WHERE uuid = ? LIMIT 1"; // SQL para obtener un usuario por uuid
                const [rows] = yield (0, msql_1.query)(sql, [uuid]); // Ejecutamos la consulta, pasando el uuid como parámetro
                if (!rows || rows.length === 0)
                    return null; // Si no hay resultados, retornamos null        
                const row = rows[0]; // Tomamos el primer resultado (ya que uuid debería ser único)
                // Retornamos una nueva instancia de User con los datos obtenidos
                return new user_1.User(row.uuid, row.name, row.last_name, row.phone_number, row.email, row.password, row.status);
            }
            catch (error) {
                console.error(error);
                return null; // En caso de error, retornamos null
            }
        });
    }
    updateUserById(uuid, name, last_name, phone_number, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const updates = {};
            if (name !== undefined)
                updates.name = name;
            if (last_name !== undefined)
                updates.last_name = last_name;
            if (phone_number !== undefined)
                updates.phone_number = phone_number;
            if (email !== undefined)
                updates.email = email;
            const keys = Object.keys(updates);
            if (keys.length === 0)
                return null; // No hay nada que actualizar.
            const sqlParts = keys.map(key => `${key} = ?`);
            const sql = `UPDATE users SET ${sqlParts.join(', ')} WHERE uuid = ?`;
            try {
                const values = keys.map(key => updates[key]);
                values.push(uuid); // Añade el UUID al final del array de valores.
                yield (0, msql_1.query)(sql, values); // Ejecuta la consulta SQL.
                const [updatedRows] = yield (0, msql_1.query)('SELECT * FROM users WHERE uuid = ?', [uuid]);
                if (!updatedRows || updatedRows.length === 0) {
                    throw new Error('No user found with the provided UUID.');
                }
                const updatedUser = new user_1.User(updatedRows[0].uuid, updatedRows[0].name, updatedRows[0].last_name, updatedRows[0].phone_number, updatedRows[0].email, updatedRows[0].password, updatedRows[0].loan_status);
                return updatedUser;
            }
            catch (error) {
                console.error('Error updating user:', error);
                throw error; // O maneja el error de la manera que prefieras.
            }
        });
    }
    deleteUser(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM users WHERE uuid = ?';
                const result = yield (0, msql_1.query)(sql, [uuid]);
                if (result[0].affectedRows === 0) {
                    return null;
                }
                return 'User deleted successfully.';
            }
            catch (error) {
                console.error('Error deleting user:', error);
                throw error; // O maneja el error de la manera que prefieras.
            }
        });
    }
    updatePassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verificar si el correo electrónico existe en la base de datos
                const checkUserSql = 'SELECT * FROM users WHERE email = ?';
                const [userRows] = yield (0, msql_1.query)(checkUserSql, [email]);
                if (userRows.length === 0) {
                    // El correo electrónico no existe en la base de datos
                    return null;
                }
                // Asumiendo que 'password' ya está cifrado.
                const hashPassword = yield (0, ashs_1.encrypt)(password);
                const updateSql = 'UPDATE users SET password = ? WHERE email = ?';
                const result = yield (0, msql_1.query)(updateSql, [hashPassword, email]);
                // Verificar si se actualizó alguna fila
                if (!result || result.affectedRows === 0) {
                    return null;
                }
                // Obtener el usuario actualizado
                const [updatedRows] = yield (0, msql_1.query)('SELECT * FROM users WHERE email = ?', [email]);
                if (updatedRows.length === 0) {
                    return null;
                }
                const updatedUser = new user_1.User(updatedRows[0].uuid, updatedRows[0].name, updatedRows[0].last_name, updatedRows[0].phone_number, updatedRows[0].email, updatedRows[0].password, updatedRows[0].status);
                return updatedUser;
            }
            catch (error) {
                console.error('Error updating password:', error);
                throw error; // O maneja el error de la manera que prefieras.
            }
        });
    }
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Primero, obtener el usuario por email.
                const [users] = yield (0, msql_1.query)('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
                if (!users || users.length === 0) {
                    return null;
                }
                const user = users[0];
                // Verificar si la contraseña proporcionada coincide con la almacenada en la base de datos.
                const passwordMatches = yield (0, ashs_1.compare)(password, user.password); //pasar a la parte 
                if (!passwordMatches) {
                    return 'Unauthorized';
                }
                // Aquí podrías generar y devolver un token JWT si estás usando autenticación basada en tokens.
                // Por ahora, simplemente devolvemos un mensaje de éxito.
                const token = (0, token_1.tokenSigIn)(user.uuid, user.email);
                return token;
            }
            catch (error) {
                console.error('Error during login:', error);
                throw error;
            }
        });
    }
    getUserByFilter(filter, email, name, phone_number) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sql;
                let value;
                switch (filter) {
                    case 'email':
                        if (!email)
                            throw new Error('Email is required when filter is email');
                        sql = 'SELECT * FROM users WHERE email = ?'; // Se ha removido LIMIT 1
                        value = email;
                        break;
                    case 'name':
                        if (!name)
                            throw new Error('Name is required when filter is name');
                        sql = 'SELECT * FROM users WHERE name = ?'; // Se ha removido LIMIT 1
                        value = name;
                        break;
                    case 'phone_number':
                        if (!phone_number)
                            throw new Error('Phone number is required when filter is phone_number');
                        sql = 'SELECT * FROM users WHERE phone_number = ?'; // Se ha removido LIMIT 1
                        value = phone_number;
                        break;
                    default:
                        throw new Error('Invalid filter type');
                }
                const [rows] = yield (0, msql_1.query)(sql, [value]);
                console.log(rows);
                if (rows.length === 0) {
                    return null;
                }
                return rows.map((row) => new user_1.User(row.uuid, row.name, row.last_name, row.phone_number, row.email, row.password, row.status));
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM users WHERE email = ? LIMIT 1"; // SQL para obtener un usuario por uuid
                const [rows] = yield (0, msql_1.query)(sql, [email]); // Ejecutamos la consulta, pasando el uuid como parámetro
                if (!rows || rows.length === 0)
                    return null; // Si no hay resultados, retornamos null        
                const row = rows[0]; // Tomamos el primer resultado (ya que uuid debería ser único)
                // Retornamos una nueva instancia de User con los datos obtenidos
                return new user_1.User(row.uuid, row.name, row.last_name, row.phone_number, row.email, row.password, row.status);
            }
            catch (error) {
                console.error(error);
                return null; // En caso de error, retornamos null
            }
        });
    }
}
exports.MysqlUserRepository = MysqlUserRepository;
