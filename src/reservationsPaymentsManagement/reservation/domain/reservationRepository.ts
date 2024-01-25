import { Reservation } from "./reservation";

export interface ReservationRepository{

    createReservation(
        uuid:string,
        userUuid:string,
        roomUuid:string,
        paymentUuid:string,
        arrive_date:string,
        departure_date:string,
        status:string
    ):Promise<Reservation | null | string | Error>

    updateReservation(
        uuid:string,
        arrive_date?: string ,
        departure_date?:string,
        status?:string
    ):Promise<Reservation | null | string | Error>

    
}