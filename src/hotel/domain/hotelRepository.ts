import { Hotel } from "./hotel";

export interface HotelRepository{
    createHotel( 
        uuid: string,
        price: number,
        description: string,
        room_type: string,
        availability: boolean,
    ): Promise<Hotel | null | string | Error> ;

    getAllHotels():Promise<Hotel[] | null>

    getById(uuid:string):Promise<Hotel | null>

}