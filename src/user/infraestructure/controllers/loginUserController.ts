import { Request, Response } from "express";
import { LoginUserUseCase } from "../../application/loginUserUseCase";
import { GetByEmialUseCase } from "../../application/getByEmailUseCase";

export class LoginUserController {
    constructor(
        readonly loginUserController: LoginUserUseCase,
        readonly getByEmialUseCase:GetByEmialUseCase
        ) {}

    async run(req:Request,res:Response) {
        
        try {
           
            let {email,password} = req.body
    
            let loginUser = await this.loginUserController.run(email, password)

            const getUserInfo = await this.getByEmialUseCase.get(email as string);

            
            if(loginUser === 'Unauthorized'){
                return res.status(401).send({
                    status: "Unauthorized",
                });
            }
            //es cuando no encuentra nada en la base de datos pero pa que no sepa el usuario que fallo 
            if(loginUser === null){
                return res.status(401).send({
                    status: "Unauthorized",
                });
            }
            if (loginUser) {
                return res.status(201).send({
                   token: loginUser,
                   userId: getUserInfo?.uuid
                })
            }
             
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.includes('Duplicate entry') && error.message.includes('for key \'users.email\'')) {
                    return res.status(409).send({
                        status: "error",
                        message: "The email address is already in use. Please use a different email address.",
                    });
                } else if (error.message.startsWith('[')) {  // Suponiendo que los errores de validación comienzan con un corchete
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message)  // Convertimos el mensaje de error en un objeto
                    });
                }
            }
           
            return res.status(500).send({
                status: "error",
                message: "An unexpected error occurred. Please try again later.",
            });
        }
    }
}