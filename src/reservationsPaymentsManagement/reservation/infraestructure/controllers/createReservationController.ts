import { Request,Response } from "express";
import { CreateReservationUseCase } from "../../application/createReservationUseCase";
import { Reservation } from "../../domain/reservation";

export class CreateRervationController{
    constructor( readonly createReservationUseCase: CreateReservationUseCase){}

    async create(req: Request, res:Response){
        try {
            let {
                userUuid,
                roomUuid,
                paymentUuid,
                arrive_date,
                departure_date,
                status
            } = req.body;
            console.log(req.body);
            
            const  createReservation = await this.createReservationUseCase.create(userUuid,roomUuid,paymentUuid,arrive_date,departure_date,status);
            
            if ( createReservation instanceof Reservation){
                return res.status(201).send({
                    status:"sucess",
                    data:{
                        uuid:createReservation.uuid,
                        userUuid: createReservation.userUuid,
                        roomUuid: createReservation.roomUuid,
                        paymentUuid: createReservation.paymentUuid,
                        arrive_date: createReservation.arrive_date,
                        departure_date: createReservation.departure_date,
                        status: createReservation.status
                    }
                })
            }
            else res.status(500).send({
                status:"Error",
                message: "An unexpected error accurred while register the user"
            })

        } catch (error) {
            if (error instanceof Error) {
                if (error.message.startsWith('[')) {
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message)
                    });
                }
            } 
            return res.status(500).send({
                status: "error",
                message: "An error occurred while delete the user."
            });
        }
    }
}