import { IsString, IsUUID, Length, IsBoolean, IsNotEmpty, ValidateIf, IsIn, IsOptional,IsEmail, IsNumber} from 'class-validator';


const allowedBedTypes = ['individual', 'matrimonial', 'kingsize'];
const allowedRoomTypes = ['individual', 'doble', 'ejecutiva', 'suit', 'presidencial', 'penthouse'];
const allowedStatusTypes = ['disponible', 'ocupado', 'mantenimiento', 'fuera de servicio'];


export class ValidatorCreateRoom {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsString()
    @IsIn(allowedBedTypes)
    public bed: string;

    @IsString()
    @IsIn(allowedRoomTypes)
    public type: string;

    @IsString()
    @IsIn(allowedStatusTypes)
    public status: string;

    @IsNumber()
    public price: number;

    constructor(
        uuid: string,
        bed: string,
        type: string,
        status: string,
        price: number,
    ) {
        this.uuid = uuid;
        this.bed = bed;
        this.type = type;
        this.status = status;
        this.price = price;

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


export class ValidatorUpdateRoom {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsOptional()
    @IsString()
    @IsIn(allowedBedTypes)
    public bed?: string;

    @IsOptional()
    @IsString()
    @IsIn(allowedRoomTypes)
    public type?: string;

    @IsOptional()
    @IsString()
    @IsIn(allowedStatusTypes)
    public status?: string;

    @IsOptional()
    @IsNumber()
    public price?: number;

    constructor(
        uuid: string,
        bed?: string,
        type?: string,
        status?: string,
        price?: number,
    ) {
        this.uuid = uuid;
        this.bed = bed;
        this.type = type;
        this.status = status;
        this.price = price;
    }
}