export class Coupon {
    constructor(
        public uuid: string,
        public code: string,
        public discount_percentage: number,
        public initial_date: Date,
        public expiration_date: Date,
        public status: string
    ) {}
}
