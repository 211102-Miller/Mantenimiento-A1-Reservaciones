import { IsUUID, IsNotEmpty, IsString, IsNumber, IsIn } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import 'reflect-metadata';

export class ValidatorCreateCoupon {
    @IsNotEmpty()
    @IsString()
    public code: string;

    @IsNotEmpty()
    @IsNumber()
    public discount_percentage: number;

    @IsNotEmpty()
    @Transform((value: TransformFnParams) => new Date(value.value), { toClassOnly: true })
    public initial_date: Date;

    @IsNotEmpty()
    @Transform((value: TransformFnParams) => new Date(value.value), { toClassOnly: true })
    public expiration_date: Date;

    @IsNotEmpty()
    @IsString()
    @IsIn(['usado', 'expirado', 'disponible'])
    public status: string;

    constructor(
        code: string,
        discount_percentage: number,
        initial_date: Date | string,
        expiration_date: Date | string,
        status: string
    ) {
        this.code = code;
        this.discount_percentage = discount_percentage;
        this.initial_date = initial_date instanceof Date ? initial_date : new Date(initial_date);
        this.expiration_date = expiration_date instanceof Date ? expiration_date : new Date(expiration_date);
        this.status = status;
    }
}

export class ValidatorId {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    constructor(uuid: string) {
        this.uuid = uuid;
    }
}

export class ValidatorCreateCouponUsage {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsNotEmpty()
    @IsUUID()
    public userUuid: string;

    @IsNotEmpty()
    @IsUUID()
    public roomUuid: string;

    @IsNotEmpty()
    @IsUUID()
    public couponUuid: string;

    @IsNotEmpty()
    @Transform((value: TransformFnParams) => new Date(value.value), { toClassOnly: true })
    public usage_date: Date;

    constructor(
        uuid: string,
        userUuid: string,
        roomUuid: string,
        couponUuid: string,
        usage_date: Date | string
    ) {
        this.uuid = uuid;
        this.userUuid = userUuid;
        this.roomUuid = roomUuid;
        this.couponUuid = couponUuid;
        this.usage_date = usage_date instanceof Date ? usage_date : new Date(usage_date);
    }
}


