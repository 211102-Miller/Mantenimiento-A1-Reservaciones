import { Request, Response } from "express";
import { GetRoomsUseCase } from "../../application/getRoomsUseCase";

export class GetRoomsController{
    constructor(readonly getRoomsUseCase: GetRoomsUseCase){}

    async get (req:Request, res:Response){
        try {
            const getRooms = await this.getRoomsUseCase.get();
            if(getRooms){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        getRooms
                    }
                })
            }else{
                return res.status(200).send({
                    status: "ok",
                    message: "Rooms not found"
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