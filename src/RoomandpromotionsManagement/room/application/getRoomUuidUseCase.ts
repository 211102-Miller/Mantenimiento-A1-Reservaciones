import { Room } from "../domain/room";
import { RoomRepository } from "../domain/roomRepository";
import { ValidatorId } from "../domain/validation/room";
import { validate } from "class-validator";

export class GetRoomUuidUseCase{
    constructor(readonly roomRepository:RoomRepository){}

    async get(uuid:string):Promise<Room | null | string | Error>{

        let post = new ValidatorId(uuid)
        const validation = await validate(post)
        console.log(validation.length)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const getRoom = await this.roomRepository.getRoomUuid(uuid);
            return getRoom;
        } catch (error) {
            return null;
        }
    }
}