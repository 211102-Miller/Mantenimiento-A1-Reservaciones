export class Room{
    constructor(
        public uuid: string,
        public bed: string,
        public type: string,
        public status: string,
        public price : number
    ){}
}