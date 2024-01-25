import { Request,Response } from "express";
import { GetRoomUuidUseCase } from "../../application/getRoomUuidUseCase";

export class GetRoomUuidController{

    constructor(readonly getRoomUuidUseCase : GetRoomUuidUseCase){}

    async get(req:Request, res:Response){
        try {

            let {uuid} = req.params;
            const getRoom = await this.getRoomUuidUseCase.get(uuid);

            if(getRoom){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        user: getRoom
                    }
                })
            }else{
                return res.status(404).send({
                    status: "error",
                    message: "Room not found."
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
                message: "An error occurred while get the Room."
            }); 
        }
    }
}