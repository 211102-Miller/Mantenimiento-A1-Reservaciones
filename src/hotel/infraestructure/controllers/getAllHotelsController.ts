import { Request, Response } from "express";
import { GetAllHotelsUseCase } from "../../application/getAllHotelsUseCase";


export class GetAllHotelsController{
    constructor(private getAllHotelsUseCase: GetAllHotelsUseCase){};


    async allUser(req:Request, res:Response){
        try {
            const listUser = await this.getAllHotelsUseCase.getAll()
            if(listUser){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        listUser
                    }
                })
            }else{
                return res.status(200).send({
                    status: "ok",
                    message: "Users not found"
                });
            }
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "An error occurred while list the user."
            });
        }
    }
}