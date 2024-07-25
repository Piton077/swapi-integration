import { Dictionary } from "./dictionary";

export class ItalianDictionary extends Dictionary {

    constructor() {
        super("it")
    }

    private dict: Record<string, string> = {
        'average_height': 'altezza_media',
        'average_lifespan': 'durata_media',
        'classification': 'classificazione',
        'created': 'creato',
        'designation': 'designazione',
        'edited': 'modificato',
        'eye_colors': 'colori_degli_occhi',
        'hair_colors': 'colori_dei_capelli',
        'homeworld': 'mondo_nativo',
        'language': 'lingua',
        'name': 'nome',
        'skin_colors': 'colori_della_pelle'
    }


    getValues(): Record<string, string> {
        return this.dict
    }


}