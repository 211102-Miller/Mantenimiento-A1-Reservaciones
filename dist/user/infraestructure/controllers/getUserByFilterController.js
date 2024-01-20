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
exports.GetUserByFilterController = void 0;
class GetUserByFilterController {
    constructor(getUserByFilterUseCase) {
        this.getUserByFilterUseCase = getUserByFilterUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { filter, name, phone_number, email, } = req.params;
                let getUserByFilter = yield this.getUserByFilterUseCase.run(filter, email, name, phone_number);
                if (getUserByFilter) {
                    return res.status(200).send({
                        status: "succes",
                        data: {
                            getUserByFilter
                        }
                    });
                }
                else {
                    return res.status(404).send({
                        status: "error",
                        message: "User not found."
                    });
                }
            }
            catch (error) {
                // Manejo de errores específicos
                return null;
            }
        });
    }
}
exports.GetUserByFilterController = GetUserByFilterController;
