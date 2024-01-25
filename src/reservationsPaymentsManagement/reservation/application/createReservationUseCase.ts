import { Reservation } from "../domain/reservation";
import { ReservationRepository } from "../domain/reservationRepository";
import { v4 as uuid } from "uuid";



export class CreateReservationUseCase{

    constructor( readonly reservationRepository:ReservationRepository){}


    async create(
        userUuid:string,
        roomUuid:string,
        paymentUuid:string,
        arrive_date:string,
        departure_date:string,
        status:string
    ):Promise< Reservation | null | string | Error>{
        
        const miuuid: string = uuid()
        try {
            const createReservation = await this.reservationRepository.createReservation(
                miuuid,
                userUuid,
                roomUuid,
                paymentUuid,
                arrive_date,
                departure_date,
                status 
            );
            return createReservation;

        } catch (error) {
            return null;
        }
    }
}