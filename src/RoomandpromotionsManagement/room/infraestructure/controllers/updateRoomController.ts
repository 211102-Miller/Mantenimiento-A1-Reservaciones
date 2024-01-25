import { Request,Response } from "express";
import { UpdateRoomUseCase } from "../../application/updateRoomUseCase";


export class UpdateRoomController {
    constructor (readonly updateRoomUseCase : UpdateRoomUseCase){}

    async update(req:Request, res:Response){
        try {
            let {uuid , bed, type, status, price} = req.body;

            const updateRoom = await this.updateRoomUseCase.update(uuid,bed,type,status,price);

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