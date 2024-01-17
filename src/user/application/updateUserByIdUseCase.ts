import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";
import { validate } from "class-validator";
import { ValidatorUpdate } from "../domain/validation/user";

export class UpdateUserByIdUseCase{
    constructor(readonly userRepository:UserRepository){}

    async update(
        uuid: string,
        name?: string,
        last_name?: string,
        phone_number?: string,
        email?: string,
        ): Promise<User | null> {

        let post = new ValidatorUpdate(uuid,name,last_name,phone_number,email)
        const validation = await validate(post)
        console.log(validation.length)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        
        try {
            const updateUserById = await this.userRepository.updateUserById(uuid,name,last_name,phone_number,email);
            return updateUserById;
        } catch (error) {
            return null;
        }
    }
}