import { Hotel } from "../domain/hotel";
import { HotelRepository } from "../domain/hotelRepository";
import { validate } from "class-validator";
import { ValidatorId } from "../domain/validation/hotel";



export class GetByIdUseCase{
    constructor(readonly userRepository:HotelRepository ){}

    async getId(uuid:string):Promise<Hotel | null>{

        let post = new ValidatorId(uuid)
        const validation = await validate(post)
        console.log(validation.length)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const getUserById = await this.userRepository.getById(uuid);
            return getUserById;
        } catch (error) {
            return null
        }
    }
}