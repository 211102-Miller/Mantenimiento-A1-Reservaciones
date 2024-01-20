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
exports.MysqlHotelRepository = void 0;
const hotel_1 = require("../domain/hotel");
const msql_1 = require("../../database/msql");
class MysqlHotelRepository {
    createHotel(uuid, price, description, room_type, availability) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sql = "INSERT INTO hotel(uuid, price, description, room_type, availability) VALUES ($1, $2, $3, $4, $5)";
                const params = [uuid, price, description, room_type, availability];
                console.log('Executing SQL:', sql);
                console.log('Parameters:', params);
                const result = yield (0, msql_1.query)(sql, params);
                console.log('Query Result:', result);
                // Asegúrate de que result tenga el formato esperado antes de intentar desestructurarlo
                return new hotel_1.Hotel(uuid, price, description, room_type, availability);
            }
            catch (error) {
                console.error("Error adding hotel:", error);
                return error;
            }
        });
    }
    getAllHotels() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sql = "SELECT * FROM hotel";
                const [result] = yield (0, msql_1.query)(sql);
                return result.map((row) => {
                    return new hotel_1.Hotel(row.uuid, row.price, row.description, row.room_type, row.availability);
                });
            }
            catch (error) {
                console.error("Error getting hotels:", error);
                return null;
            }
        });
    }
    getById(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sql = "SELECT * FROM hotel WHERE uuid = ?";
                const [result] = yield (0, msql_1.query)(sql, [uuid]);
                if (result.length === 0) {
                    return null;
                }
                const row = result[0];
                return new hotel_1.Hotel(row.uuid, row.price, row.description, row.room_type, row.availability);
            }
            catch (error) {
                console.error("Error getting hotel by id:", error);
                return null;
            }
        });
    }
}
exports.MysqlHotelRepository = MysqlHotelRepository;
