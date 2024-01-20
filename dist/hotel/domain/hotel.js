"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hotel = void 0;
class Hotel {
    constructor(uuid, price, description, room_type, availability) {
        this.uuid = uuid;
        this.price = price;
        this.description = description;
        this.room_type = room_type;
        this.availability = availability;
    }
}
exports.Hotel = Hotel;
