import { ObjectId } from "mongodb";

export default class Superhero {
    constructor(
        public nickname: string, 
        public real_name: string,
        public origin_description: string,
        public superpowers: string,
        public catch_phrase: string,
        public Images: string[],
        public _id?: ObjectId
    ) {}
}