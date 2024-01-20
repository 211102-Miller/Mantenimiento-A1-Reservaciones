import { IsString,IsUUID, Length,IsNumber, IsBoolean, IsIn, IsNotEmpty } from 'class-validator';

export class ValidatorCreateHotel {
    @IsNotEmpty()
    @IsString()
    public uuid: string;

    @IsNotEmpty()
    @IsNumber()
    public price: number;

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    public description: string;

    @IsNotEmpty()
    @IsString()
    @IsIn(['individual', 'familiar', 'Lujo'])
    public room_type: string;

    @IsNotEmpty()
    @IsBoolean()
    public availability: boolean;

    constructor(
        uuid: string,
        price: number,
        description: string,
        room_type: string,
        availability: boolean
    ) {
        this.uuid = uuid;
        this.price = price;
        this.description = description;
        this.room_type = room_type;
        this.availability = availability;
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