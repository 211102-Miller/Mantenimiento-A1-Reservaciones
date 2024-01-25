import { Room } from "../domain/room";
import { RoomRepository } from "../domain/roomRepository";
import { v4 as uuid } from "uuid";
import { ValidatorCreateRoom } from "../domain/validation/room";
import { validate } from "class-validator";

export class CreateRoomUseCase{
    constructor(readonly roomRepository : RoomRepository){}

    async create(
        bed: string,
        type: string,
        status: string,
        price : number
    ):Promise<Room | null | string | Error>{
        const miuuid: string = uuid()

        let post = new ValidatorCreateRoom(miuuid, bed,type,status,price);
        const validation = await validate(post)
        if (validation.length > 0) {
             throw new Error(JSON.stringify(validation));
        }

        try {
            const roomCreate = await this.roomRepository.createRoom(miuuid,bed,type,status,price)
            return roomCreate;
        } catch (error) {
            return null;
        }
    }
}