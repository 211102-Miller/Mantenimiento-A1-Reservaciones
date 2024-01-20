export class Hotel {
    constructor(
        public uuid: string,
        public price: number,
        public description: string,
        public room_type: string,
        public availability: boolean
    ) {}
}
