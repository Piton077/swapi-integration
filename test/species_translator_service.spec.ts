import { SpanishDictionary } from "src/core/domain/dictionaries/spanish.dictionary";
import { TranslatorService } from "src/core/domain/services/translator.service";
import { SpeciesEntity } from "src/core/domain/species/species.entity";



describe(' Translator Service', () => {

    beforeEach(async () => {
    });

    describe('Translation Service for Spanish', () => {
        it('should return a new schema with spanish attributes', () => {
            const spanishDictionary = new SpanishDictionary()
            const entity = new SpeciesEntity()
            entity.average_height = 200
            entity.average_lifespan = 200
            const translator = new TranslatorService<SpeciesEntity>(spanishDictionary)
            const resp = translator.translate(entity)
            expect(resp).toEqual({
                "altura_promedio": 200,
                "tiempo_vida_estimado": 200,
            })

        });
    });
});
