export abstract class Dictionary {

    abstract getValues(): Record<string, string>

    constructor(private readonly shorthand: string) { }


    getLanguage() {
        return this.shorthand
    }

    mapTranslation(word: string): string {
        return this.getValues()[word]
    }
}