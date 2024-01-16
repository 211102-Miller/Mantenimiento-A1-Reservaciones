import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";
import { ValidatorFilter } from "../domain/validation/user";
import { validate } from "class-validator";


export class GetUserByFilterUseCase {
    constructor(readonly usuarioRepository: UserRepository) {}
    
    async run(filter: string,  email?:string,name?:string,nick_name?:string,phone_number?: string): Promise<User| User[] |null> {
        
        let post = new ValidatorFilter(filter,email,name,nick_name,phone_number)
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {    
            const getByFilter = await this.usuarioRepository.getUserByFilter(filter,email, name, nick_name,phone_number);
            return getByFilter;
        } catch (error) {
            return null;
        }
    }
}