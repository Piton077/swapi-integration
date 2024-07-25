import { isTranslatable } from "../decorator/property.decorator";
import { Dictionary } from "../dictionaries/dictionary";


export class TranslatorService<T = any> {

    constructor(private dictionary: Dictionary) { }

    translate(entity: T): Record<string, any> {
        const resp: Record<string, any> = {}
        Object.keys(entity).forEach((k) => {
            const newWord = this.dictionary.mapTranslation(k)
            if (isTranslatable(entity, k)) {
                resp[newWord] = entity[k]
            }
        })
        return resp
    }

    setDictionary(dictionary: Dictionary) {
        this.dictionary = dictionary
    }
}