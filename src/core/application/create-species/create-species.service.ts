import { Inject, Injectable } from "@nestjs/common";
import { FinderRepository } from "src/core/domain/ports/repository/finder.repository";
import { WritingRepository } from "src/core/domain/ports/repository/writing.repository";
import { CreatorBaseService } from "src/core/domain/ports/services/creator-base.service";
import { SpeciesEntity } from "src/core/domain/species/species.entity";
import { CreateSpeciesInputDto } from "./dto/input/create-species.input.dto";


@Injectable()
export class CreateSpeciesServices implements CreatorBaseService<CreateSpeciesInputDto> {

    constructor(@Inject(WritingRepository) private writingRepository: WritingRepository<SpeciesEntity>, @Inject(FinderRepository) private finderRepository: FinderRepository<SpeciesEntity>) {

    }

    async create(input: CreateSpeciesInputDto) {
        const entity = await this.finderRepository.findByName(input.name)
        if (entity) {
            throw new Error(`Ya existe una especie con ese nombre ${input.name}`)
        }
        const entityToStore: SpeciesEntity = Object.assign(new SpeciesEntity, input)
        await this.writingRepository.create(entityToStore)
    }
}