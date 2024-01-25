export class Reservation{
    constructor(
        public uuid:string,
        public userUuid:string,
        public roomUuid:string,
        public paymentUuid:string,
        public arrive_date:string,
        public departure_date:string,
        public status:string
    ){}
}