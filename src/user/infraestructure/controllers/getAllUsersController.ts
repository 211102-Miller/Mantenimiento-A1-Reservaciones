import { Request, Response } from "express";
import { GetAllUsersUseCase } from "../../application/getAllUsersUseCase";


export class GetAllUsersController{
    constructor(private getAllUsersUseCase: GetAllUsersUseCase){};


    async allUser(req:Request, res:Response){
        try {
            const listUser = await this.getAllUsersUseCase.getAll()
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