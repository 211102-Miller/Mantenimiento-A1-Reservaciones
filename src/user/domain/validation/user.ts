import { IsString, IsUUID, Length, IsBoolean, IsNotEmpty, ValidateIf, IsIn, IsOptional,IsEmail} from 'class-validator';


export class ValidatorCreateUser {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    public name: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    public last_name: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 12)
    public nick_name: string;

    @IsNotEmpty()
    @IsString()
    @Length(10) 
    public phone_number: string;

    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @IsString()
    public password: string;


    @IsNotEmpty()
    @IsBoolean()
    public status: boolean;

    constructor(
        uuid: string,
        name: string,
        last_name: string,
        nick_name:string,
        phone_number: string,
        email: string,
        password: string,
        status: boolean
    ) {
        this.uuid = uuid;
        this.name = name;
        this.last_name = last_name;
        this.nick_name = nick_name;
        this.phone_number = phone_number;
        this.email = email;
        this.password = password;
        this.status = status;
    }

}

export class ValidatorId {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;
    constructor(uuid:string) {
        this.uuid = uuid
    }
}

export class ValidatorUpdate {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    public name?: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    public last_name?: string;

    @IsOptional()
    @IsString()
    @Length(1, 12)
    public nick_name?: string;

    @IsOptional()
    @IsString()
    @Length(10)  
    public phone_number?: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    public email?: string;
    constructor( 
        uuid: string,
        name?: string,
        last_name?: string,
        nick_name?:string,
        phone_number?: string,
        email?: string,) {
            
        this.uuid = uuid;
        this.name = name;
        this.last_name = last_name;
        this.nick_name = nick_name;
        this.phone_number = phone_number
        this.email = email;
    }
}

export class ValidatorupdatePassword {

    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @IsString()
    public password: string;

    constructor(
        email: string,
        password: string
    ) {
        this.email = email;
        this.password = password;
    }

}
export class ValidateEmail{
    @IsNotEmpty()
    @IsEmail()
    public email: string;

    constructor(
        email: string
    ) {
        this.email = email;
    }

}
export class ValidateLogin {
    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @IsString()
    public password: string;

    constructor(
        email:string,
        password:string,
    ){
        this.email = email,
        this.password = password
    }
}

export class ValidatorFilter {
    @IsNotEmpty()
    @IsString()
    @IsIn(['email', 'name', 'nick-name','phone_number'])
    public filter: string;

    @ValidateIf(o => o.filter === 'email')
    @IsNotEmpty()
    @IsEmail()
    public email?: string;

    @ValidateIf(o => o.filter === 'name')
    @IsNotEmpty()
    @IsString()
    public name?: string;

    @ValidateIf(o => o.filter === 'nick-name')
    @IsNotEmpty()
    @IsString()
    public nick_name?: string;

    @ValidateIf(o => o.filter === 'phone_number')
    @IsNotEmpty()
    public phone_number?: string;

    constructor(
        filter: string,
        email?: string,
        name?: string,
        nick_name?: string,
        phone_number?: string
    ) {
        this.filter = filter;
        this.email = email;
        this.name = name;
        this.nick_name = nick_name;
        this.phone_number = phone_number;
    }
}