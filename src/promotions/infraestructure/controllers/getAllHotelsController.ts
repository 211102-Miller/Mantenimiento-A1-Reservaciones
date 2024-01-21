import { Request, Response } from "express";
import { GetAllCouponsUseCase } from "../../application/getAllCouponsUseCase";


export class GetAllCouponsController{
    constructor(private getAllHotelsUseCase: GetAllCouponsUseCase){};


    async run(req:Request, res:Response){
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