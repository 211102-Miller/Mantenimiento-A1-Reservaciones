import { Request,Response } from "express";
import { Room } from "../../domain/room";
import { CreateRoomUseCase } from "../../application/createRoomUseCase";


export class CreateRoomController {

    constructor(readonly createRoomUseCase:CreateRoomUseCase){}

    async create(req:Request, res:Response){
        try {
            let{bed,type,status,price} = req.body;

            let registerRoom = await this.createRoomUseCase.create(bed,type,status,price)

            if (registerRoom instanceof Room){
                return res.status(201).send({
                    status:"sucess",
                    data:{
                        id:registerRoom.uuid,
                        bed: registerRoom.bed,
                        type: registerRoom.type,
                        status: registerRoom.status,
                        price: registerRoom.price
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