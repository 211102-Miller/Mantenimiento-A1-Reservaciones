"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorFilter = exports.ValidateLogin = exports.ValidateEmail = exports.ValidatorupdatePassword = exports.ValidatorUpdate = exports.ValidatorId = exports.ValidatorCreateUser = void 0;
const class_validator_1 = require("class-validator");
class ValidatorCreateUser {
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
exports.ValidatorCreateUser = ValidatorCreateUser;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ValidatorCreateUser.prototype, "uuid", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], ValidatorCreateUser.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], ValidatorCreateUser.prototype, "last_name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(10),
    __metadata("design:type", String)
], ValidatorCreateUser.prototype, "phone_number", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ValidatorCreateUser.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ValidatorCreateUser.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ValidatorCreateUser.prototype, "status", void 0);
class ValidatorId {
    constructor(uuid) {
        this.uuid = uuid;
    }
}
exports.ValidatorId = ValidatorId;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ValidatorId.prototype, "uuid", void 0);
class ValidatorUpdate {
    constructor(uuid, name, last_name, nick_name, phone_number, email) {
        this.uuid = uuid;
        this.name = name;
        this.last_name = last_name;
        this.phone_number = phone_number;
        this.email = email;
    }
}
exports.ValidatorUpdate = ValidatorUpdate;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ValidatorUpdate.prototype, "uuid", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], ValidatorUpdate.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], ValidatorUpdate.prototype, "last_name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(10),
    __metadata("design:type", String)
], ValidatorUpdate.prototype, "phone_number", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], ValidatorUpdate.prototype, "email", void 0);
class ValidatorupdatePassword {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}
exports.ValidatorupdatePassword = ValidatorupdatePassword;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ValidatorupdatePassword.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ValidatorupdatePassword.prototype, "password", void 0);
class ValidateEmail {
    constructor(email) {
        this.email = email;
    }
}
exports.ValidateEmail = ValidateEmail;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ValidateEmail.prototype, "email", void 0);
class ValidateLogin {
    constructor(email, password) {
        this.email = email,
            this.password = password;
    }
}
exports.ValidateLogin = ValidateLogin;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ValidateLogin.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ValidateLogin.prototype, "password", void 0);
class ValidatorFilter {
    constructor(filter, email, name, nick_name, phone_number) {
        this.filter = filter;
        this.email = email;
        this.name = name;
        this.nick_name = nick_name;
        this.phone_number = phone_number;
    }
}
exports.ValidatorFilter = ValidatorFilter;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['email', 'name', 'nick-name', 'phone_number']),
    __metadata("design:type", String)
], ValidatorFilter.prototype, "filter", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => o.filter === 'email'),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ValidatorFilter.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => o.filter === 'name'),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ValidatorFilter.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => o.filter === 'nick-name'),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ValidatorFilter.prototype, "nick_name", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => o.filter === 'phone_number'),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ValidatorFilter.prototype, "phone_number", void 0);
