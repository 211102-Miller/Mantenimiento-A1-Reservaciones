import { User } from "./user";

export interface UserRepository{
    createUser( //ya se valida class //listo
        uuid: string,
        name: string,
        last_name: string,
        nick_name: string,
        phone_number: string,
        email: string,
        password: string,
        status: boolean
    ): Promise<User | null | string | Error> ;

    getAllUsers():Promise<User[] | null>

    getById(uuid:string):Promise<User | null>

    updateUserById( //listo 
        uuid: string,
        name?: string,
        last_name?: string,
        nick_name?: string,
        phone_number?: string,
        email?: string,
    ): Promise<User | null>

    deleteUser(uuid: string):Promise<string | null>;

    updatePassword(email: string, password: string): Promise<User | null>

    loginUser(email:string, password:string):Promise<string | null> 

    getUserByFilter( //listo
        filter: string,
        email?: string,
        name?: string,
        nick_name?:string,
        phone_number?: string
    ): Promise<User | User[] | null>

    getByEmail(email:string):Promise<User | null>
}