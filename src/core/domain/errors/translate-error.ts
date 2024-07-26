import { CustomError } from "./base.error";

export class TranslateError extends CustomError {
    constructor(language: string) {
        super(`El lenguage ${language} no esta disponible por el momento`);
        this.name = TranslateError.name;
    }
}