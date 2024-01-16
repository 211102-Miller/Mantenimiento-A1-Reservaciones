import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";
import { validate } from "class-validator";
import { ValidatorupdatePassword } from "../domain/validation/user";


export class  UpdatePasswordUseCase{
    constructor(readonly userRepository:UserRepository){}

    async updatePassword(email:string,password:string):Promise<User |null>{

        let post = new ValidatorupdatePassword(email, password)
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const update = await this.userRepository.updatePassword(email,password);
            return update;
        } catch (error) {
            return null;
        }
    }
}