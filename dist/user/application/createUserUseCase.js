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
exports.CreateUserUseCase = void 0;
const uuid_1 = require("uuid");
const ashs_1 = require("../../helpers/ashs");
const user_1 = require("../domain/validation/user");
const class_validator_1 = require("class-validator");
class CreateUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    run(name, last_name, phone_number, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const miuuid = (0, uuid_1.v4)();
            const status = false;
            //validator-class
            let post = new user_1.ValidatorCreateUser(miuuid, name, last_name, phone_number, email, password, status);
            const validation = yield (0, class_validator_1.validate)(post);
            if (validation.length > 0) {
                throw new Error(JSON.stringify(validation));
            }
            //aqui por que si va vacio se hashea antes evitando asi la validacion 
            const hashPassword = yield (0, ashs_1.encrypt)(password);
            try {
                const createUser = yield this.userRepository.createUser(miuuid, name, last_name, phone_number, email, hashPassword, status);
                return createUser;
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
