import { Injectable } from "@nestjs/common";
import { Dictionary } from "src/core/domain/dictionaries/dictionary";
import { SpeciesNotFoundError } from "src/core/domain/errors/species/species-not-found.error";
import { TranslateError } from "src/core/domain/errors/translate-error";
import { FinderBaseService } from "src/core/domain/ports/services/finder-base.service";
import { TranslatorService } from "src/core/domain/services/translator.service";
import { SpeciesEntity } from "src/core/domain/species/species.entity";
import { FinderEntityLink } from "../helpers/finder-entity-chain/finder-entity.director";


@Injectable()
export class FinderSpeciesService implements FinderBaseService<Record<string, any>> {


    constructor(
        private dictionaries: Dictionary[],
        private finderRepository: FinderEntityLink<SpeciesEntity>,
    ) {

    }

    async findByName(name: string, language: string) {
        const dictionary = this.dictionaries.find((d) => d.getLanguage() == language)
        if (!dictionary) {
            throw new TranslateError(language)
        }
        const entity = await this.finderRepository.findByName(name)
        if (!entity) { throw new SpeciesNotFoundError(name) }
        const translator = new TranslatorService(dictionary);
        const translation = translator.translate(entity)
        return translation
    }

}