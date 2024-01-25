import { Room } from "./room";

export interface RoomRepository{

    createRoom(
        uuid: string,
        bed: string,
        type: string,
        status: string,
        price : number
    ):Promise<Room | null | string | Error>;

    getRoomUuid(uuid:string):Promise<Room | null | string | Error>;

    getRooms():Promise< Room[] | null | string | Error>;

    updateRoom(
        uuid:string,
        bed?:string,
        type?:string,
        status?: string,
        price?: number
    ):Promise <Room | null | string | Error>
    
}