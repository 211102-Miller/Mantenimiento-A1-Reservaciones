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
exports.GetAllUsersController = void 0;
class GetAllUsersController {
    constructor(getAllUsersUseCase) {
        this.getAllUsersUseCase = getAllUsersUseCase;
    }
    ;
    allUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listUser = yield this.getAllUsersUseCase.getAll();
                if (listUser) {
                    return res.status(200).send({
                        status: "succes",
                        data: {
                            listUser
                        }
                    });
                }
                else {
                    return res.status(200).send({
                        status: "ok",
                        message: "Users not found"
                    });
                }
            }
            catch (error) {
                return res.status(500).send({
                    status: "error",
                    message: "An error occurred while list the user."
                });
            }
        });
    }
}
exports.GetAllUsersController = GetAllUsersController;
