"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(uuid, name, last_name, phone_number, email, password, status) {
        this.uuid = uuid;
        this.name = name;
        this.last_name = last_name;
        this.phone_number = phone_number;
        this.email = email;
        this.password = password;
        this.status = status;
    }
}
exports.User = User;
