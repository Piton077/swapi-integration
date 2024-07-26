import { CustomError } from "../base.error";

export class SpeciesNotFoundError extends CustomError {
    constructor(name: string) {
        super(`No se encontró species con nombre : ${name}`);
        this.name = SpeciesNotFoundError.name;
    }
}