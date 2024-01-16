import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";
import { validate } from "class-validator";
import { ValidateEmail } from "../domain/validation/user";


export class GetByEmialUseCase{
    constructor( readonly userRepository: UserRepository){}

    async get(email: string):Promise <User | null >{

        let post = new ValidateEmail(email)
        const validation = await validate(post)
        console.log(validation.length)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const result = await this.userRepository.getByEmail(email);
            return result;
        } catch (error) {
            return null;
        }
    }
}