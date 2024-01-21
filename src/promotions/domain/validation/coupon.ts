import {IsUUID, IsNotEmpty, IsString, IsNumber, IsDate, IsIn } from 'class-validator';

export class ValidatorCreateCoupon {
    @IsNotEmpty()
    @IsString()
    public code: string;

    @IsNotEmpty()
    @IsNumber()
    public discount_percentage: number;

    @IsNotEmpty()
    @IsDate()
    public initial_date: Date;

    @IsNotEmpty()
    @IsDate()
    public expiration_date: Date;

    @IsNotEmpty()
    @IsString()
    @IsIn(['usado', 'expirado', 'disponible'])
    public status: string;

    constructor(
        code: string,
        discount_percentage: number,
        initial_date: Date,
        expiration_date: Date,
        status: string
    ) {
        this.code = code;
        this.discount_percentage = discount_percentage;
        this.initial_date = initial_date;
        this.expiration_date = expiration_date;
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