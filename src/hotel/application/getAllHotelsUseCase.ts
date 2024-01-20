import { Hotel } from "../domain/hotel";
import { HotelRepository} from "../domain/hotelRepository";

export class GetAllHotelsUseCase{
    constructor(readonly hotelRepository: HotelRepository){}


    async getAll():Promise<Hotel[] | null>{
        try {
            const listUsers = await this.hotelRepository.getAllHotels();
            return listUsers; 
        } catch (error) {
            return null;        }
    }
}