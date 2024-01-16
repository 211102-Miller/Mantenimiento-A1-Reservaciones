import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";
import { validate } from "class-validator";
import { ValidatorId } from "../domain/validation/user";

export class DeleteUserUseCase{

    constructor(readonly userRepository: UserRepository){}

    async deleteUser(uuid:string):Promise<string | null>{

        let post = new ValidatorId(uuid)
        const validation = await validate(post)
        console.log(validation.length)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const user = await this.userRepository.deleteUser(uuid);
            return user;
        } catch (error) {
            return null
        }
    }
}