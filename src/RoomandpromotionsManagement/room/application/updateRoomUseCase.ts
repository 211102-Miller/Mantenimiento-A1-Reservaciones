import { Room } from "../domain/room";
import { RoomRepository } from "../domain/roomRepository";
import { ValidatorUpdateRoom } from "../domain/validation/room";
import { validate } from "class-validator";

export class UpdateRoomUseCase{
    constructor( readonly roomRepository: RoomRepository){}

    async update(uuid:string, bed?:string, type?:string, status?:string, price?:number){

        let post = new ValidatorUpdateRoom(uuid, bed,type,status,price);
        const validation = await validate(post)
        if (validation.length > 0) {
             throw new Error(JSON.stringify(validation));
        }

        try {
            const updateRoom = await this.roomRepository.updateRoom(uuid,bed,type,status,price);
            return updateRoom;
        } catch (error) {
            return null;
        }
    }
}