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
exports.CreateHotelUseCase = void 0;
const uuid_1 = require("uuid");
const hotel_1 = require("../domain/validation/hotel");
const class_validator_1 = require("class-validator");
class CreateHotelUseCase {
    constructor(hotelRepository) {
        this.hotelRepository = hotelRepository;
    }
    run(price, description, room_type, availability) {
        return __awaiter(this, void 0, void 0, function* () {
            const myuuid = (0, uuid_1.v4)();
            // Validator-class
            let hotel = new hotel_1.ValidatorCreateHotel(myuuid, price, description, room_type, availability);
            const validation = yield (0, class_validator_1.validate)(hotel);
            if (validation.length > 0) {
                throw new Error(JSON.stringify(validation));
            }
            try {
                const createdHotel = yield this.hotelRepository.createHotel(myuuid, price, description, room_type, availability);
                return createdHotel;
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.CreateHotelUseCase = CreateHotelUseCase;
