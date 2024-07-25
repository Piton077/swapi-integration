import { SpanishDictionary } from "../../dictionaries/spanish.dictionary";
import { SpeciesEntity } from "../../species/species.entity";
import { TranslatorService } from "../translator.service";


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
            expect(resp).toEqual({})

        });
    });
});
