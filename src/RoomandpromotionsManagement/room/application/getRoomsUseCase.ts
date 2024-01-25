import { Room } from "../domain/room";
import { RoomRepository } from "../domain/roomRepository";

export class GetRoomsUseCase{
    constructor(readonly roomRepository: RoomRepository){}

    async get():Promise<Room[] | null | string | Error>{
        try {
            const getRooms = await this.roomRepository.getRooms();
            return getRooms;
        } catch (error) {
            return null;
        }
    }
}