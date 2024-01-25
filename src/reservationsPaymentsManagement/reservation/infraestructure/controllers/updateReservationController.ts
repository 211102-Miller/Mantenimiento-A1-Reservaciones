import { Request,Response } from "express";
import { UpdateReservationUseCase } from "../../application/updateReservationUseCase";


export class UpdateReservationController {
    constructor (readonly updateReservationUseCase : UpdateReservationUseCase){}

    async update(req:Request, res:Response){
        try {
            let {uuid , arrive_date, departure_date,type, status} = req.body;

            const updateRoom = await this.updateReservationUseCase.update(uuid,arrive_date,departure_date,status);

            if(updateRoom){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        update_Room: updateRoom
                    }
                })
            }else{
                return res.status(404).send({
                    status: "error",
                    message: "Room not found "
                });
            }
            
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