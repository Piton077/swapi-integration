import { Inject, Injectable } from "@nestjs/common";
import { Dictionary } from "src/core/domain/dictionaries/dictionary";
import { FinderRepository } from "src/core/domain/ports/repository/finder.repository";
import { FinderBaseService } from "src/core/domain/ports/services/finder-base.service";
import { TranslatorService } from "src/core/domain/services/translator.service";
import { SpeciesEntity } from "src/core/domain/species/species.entity";


@Injectable()
export class FinderSpeciesService implements FinderBaseService<Record<string, any>> {


    constructor(private dictionaries: Dictionary[], @Inject(FinderRepository) private finderRepository: FinderRepository<SpeciesEntity>) {

    }

    async findByName(name: string, language: string) {

        const entity = await this.finderRepository.findByName(name)
        if (!entity) { throw new Error("Not species found") }
        const dictionary = this.dictionaries.find((d) => d.getLanguage() == language)
        if (!dictionary) {
            throw new Error(`The language ${language} is not available at the moment`)
        }
        const translator = new TranslatorService(dictionary);
        const translation = translator.translate(entity)
        return translation
    }

}