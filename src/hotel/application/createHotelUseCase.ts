import { Hotel} from "../domain/hotel";
import { HotelRepository } from "../domain/hotelRepository";
import { v4 as uuid } from 'uuid';
import { encrypt } from "../../helpers/ashs";
import { ValidatorCreateHotel } from "../domain/validation/hotel";
import { validate } from "class-validator";

export class CreateHotelUseCase {
    constructor(readonly hotelRepository: HotelRepository) {}

    async run(
        price: number,
        description: string,
        room_type: string,
        availability: boolean
    ): Promise<Hotel | null | string | Error> {
        const myuuid: string = uuid()
        
        // Validator-class
        let hotel = new ValidatorCreateHotel(myuuid, price, description, room_type, availability);
        const validation = await validate(hotel);
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const createdHotel = await this.hotelRepository.createHotel(
                myuuid,
                price,
                description,
                room_type,
                availability
            );

            return createdHotel;
        } catch (error) {
            return null;
        }
    }
}

