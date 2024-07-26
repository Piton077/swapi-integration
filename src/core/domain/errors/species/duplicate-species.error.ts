import { CustomError } from "../base.error";

export class DuplicateSpeciesError extends CustomError {
    constructor(name: string) {
        super(`Ya existe una especie con ese nombre ${name}`);
        this.name = DuplicateSpeciesError.name;
    }
}