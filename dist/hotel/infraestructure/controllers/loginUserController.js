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
exports.LoginUserController = void 0;
class LoginUserController {
    constructor(loginUserController, getByEmialUseCase) {
        this.loginUserController = loginUserController;
        this.getByEmialUseCase = getByEmialUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { email, password } = req.body;
                let loginUser = yield this.loginUserController.run(email, password);
                const getUserInfo = yield this.getByEmialUseCase.get(email);
                if (loginUser === 'Unauthorized') {
                    return res.status(401).send({
                        status: "Unauthorized",
                    });
                }
                //es cuando no encuentra nada en la base de datos pero pa que no sepa el usuario que fallo 
                if (loginUser === null) {
                    return res.status(401).send({
                        status: "Unauthorized",
                    });
                }
                if (loginUser) {
                    return res.status(201).send({
                        token: loginUser,
                        userId: getUserInfo === null || getUserInfo === void 0 ? void 0 : getUserInfo.uuid
                    });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.message.includes('Duplicate entry') && error.message.includes('for key \'users.email\'')) {
                        return res.status(409).send({
                            status: "error",
                            message: "The email address is already in use. Please use a different email address.",
                        });
                    }
                    else if (error.message.startsWith('[')) { // Suponiendo que los errores de validación comienzan con un corchete
                        return res.status(400).send({
                            status: "error",
                            message: "Validation failed",
                            errors: JSON.parse(error.message) // Convertimos el mensaje de error en un objeto
                        });
                    }
                }
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred. Please try again later.",
                });
            }
        });
    }
}
exports.LoginUserController = LoginUserController;
