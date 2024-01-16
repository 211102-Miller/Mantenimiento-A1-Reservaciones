import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";

export class GetAllUsersUseCase{
    constructor(readonly userRepository: UserRepository){}


    async getAll():Promise<User[] | null>{
        try {
            const listUsers = await this.userRepository.getAllUsers();
            return listUsers; 
        } catch (error) {
            return null;        }
    }
}