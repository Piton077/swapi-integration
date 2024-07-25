import { Identifier } from "./identifier";

export class BaseEntity {
    identifier: Identifier

    constructor() {
        this.identifier = new Identifier()
    }


}