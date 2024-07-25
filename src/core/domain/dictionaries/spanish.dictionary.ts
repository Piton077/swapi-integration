import { Dictionary } from "./dictionary";

export class SpanishDictionary extends Dictionary {


    constructor() {
        super("es")
    }
    private dict: Record<string, string> = {
        'average_height': 'altura_promedio',
        'average_lifespan': 'tiempo_vida_estimado',
        'classification': 'clasificacion',
        'created': 'creado',
        'designation': 'designacion',
        'edited': 'editado',
        'eye_colors': 'color_ojos',
        'hair_colors': 'color_pelo',
        'homeworld': 'planeta_origen',
        'language': 'lenguaje',
        'name': 'nombre',
        'skin_colors': 'color_piel'
    }

    getValues(): Record<string, string> {
        return this.dict
    }


}