import { v4 as uuid } from 'uuid';


export class Identifier {
    private _id: string

    constructor(id?: string) {
        if (id) {
            this._id = id
        }
    }

    get id() {
        return this._id
    }

    static generate() {
        const id = uuid();
        return new Identifier(id)
    }
}