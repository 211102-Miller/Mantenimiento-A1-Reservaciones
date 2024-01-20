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
exports.DeleteUserUseCase = void 0;
const class_validator_1 = require("class-validator");
const user_1 = require("../domain/validation/user");
class DeleteUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    deleteUser(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            let post = new user_1.ValidatorId(uuid);
            const validation = yield (0, class_validator_1.validate)(post);
            console.log(validation.length);
            if (validation.length > 0) {
                throw new Error(JSON.stringify(validation));
            }
            try {
                const user = yield this.userRepository.deleteUser(uuid);
                return user;
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.DeleteUserUseCase = DeleteUserUseCase;
