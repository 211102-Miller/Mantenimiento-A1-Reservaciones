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
exports.LoginUserUseCase = void 0;
const class_validator_1 = require("class-validator");
const hotel_1 = require("../domain/validation/hotel");
class LoginUserUseCase {
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
    run(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            //validator-class
            let post = new hotel_1.ValidateLogin(email, password);
            const validation = yield (0, class_validator_1.validate)(post);
            if (validation.length > 0) {
                throw new Error(JSON.stringify(validation));
            }
            try {
                const loginUser = yield this.usuarioRepository.loginUser(email, password);
                return loginUser;
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.LoginUserUseCase = LoginUserUseCase;
