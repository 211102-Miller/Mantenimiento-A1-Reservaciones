export class Usercoupon {
    constructor(
        public uuid: string,
        public bed: string,
        public type: string,
        public status: string,
        public price: number,
        public costo: number,
        public userUuid: string,
        public couponUuid: string,
        public usage_date: Date,
        public discount_percentage: number
    ) {}
    
}
