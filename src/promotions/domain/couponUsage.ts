export class CouponUsage {
    constructor(
        public uuid: string,
        public userUuid: string,
        public roomUuid: string,
        public couponUuid: string,
        public usage_date: Date

    ) {}
}
