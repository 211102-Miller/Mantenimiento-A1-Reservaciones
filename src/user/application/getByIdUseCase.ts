import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";
import { validate } from "class-validator";
import { ValidatorId } from "../domain/validation/user";



export class GetByIdUseCase{
    constructor(readonly userRepository:UserRepository ){}

    async getId(uuid:string):Promise<User | null>{

        let post = new ValidatorId(uuid)
        const validation = await validate(post)
        console.log(validation.length)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const getUserById = await this.userRepository.getById(uuid);
            return getUserById;
        } catch (error) {
            return null
        }
    }
}