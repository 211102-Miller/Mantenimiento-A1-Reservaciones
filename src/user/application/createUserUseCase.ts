import { User} from "../domain/user";
import { UserRepository } from "../domain/userRepository";
import { v4 as uuid } from "uuid";
import { encrypt } from "../../helpers/ashs";
import { ValidatorCreateUser } from "../domain/validation/user";
import { validate } from "class-validator";

export class CreateUserUseCase{
    constructor(readonly userRepository:UserRepository ){}

    async run(
        name: string,
        last_name: string,
        nick_name: string,
        phone_number: string,
        email: string,
        password:string
    ): Promise<User | null | string | Error>{

         const miuuid: string = uuid()
         const status = false
        
 
         //validator-class
         let post = new ValidatorCreateUser(miuuid, name, last_name, nick_name,phone_number, email, password, status);
         const validation = await validate(post)
         if (validation.length > 0) {
             throw new Error(JSON.stringify(validation));
         }
         //aqui por que si va vacio se hashea antes evitando asi la validacion 
         const hashPassword = await encrypt(password)
         try {
             const createUser = await this.userRepository.createUser(
                 miuuid,
                 name,
                 last_name,
                 nick_name,
                 phone_number,
                 email,
                 hashPassword,
                 status
             );
 
             return createUser;
         } catch (error) {
             return null;
         }
     }
}