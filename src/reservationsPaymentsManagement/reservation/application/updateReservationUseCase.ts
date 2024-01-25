import { Reservation } from "../domain/reservation";
import { ReservationRepository } from "../domain/reservationRepository";

export class UpdateReservationUseCase{

    constructor( readonly reservationRepository:ReservationRepository){}


    async update(
        uuid:string,
        arrive_date?:string,
        departure_date?:string,
        status?:string
    ):Promise< Reservation | null | string | Error>{
        
        try {
            const createReservation = await this.reservationRepository.updateReservation(
                uuid,
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