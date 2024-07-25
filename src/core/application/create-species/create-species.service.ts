import { Inject, Injectable } from "@nestjs/common";
import { CreationRepository } from "src/core/domain/ports/repository/creation.repository";
import { FinderRepository } from "src/core/domain/ports/repository/finder.repository";
import { CreatorBaseService } from "src/core/domain/ports/services/creator-base.service";
import { SpeciesEntity } from "src/core/domain/species/species.entity";
import { CreateSpeciesInputDto } from "./dto/input/create-species.input.dto";


@Injectable()
export class CreateSpeciesServices implements CreatorBaseService<CreateSpeciesInputDto> {

    constructor(@Inject(FinderRepository) private finderRepository: FinderRepository<SpeciesEntity>, @Inject(CreationRepository) private creationRepository: CreationRepository<SpeciesEntity>) {

    }

    async create(input: CreateSpeciesInputDto) {
        const entity = await this.finderRepository.findByName(input.name)
        if (entity) throw new Error("Existe especie con ese nombre")
        const entityToStore: SpeciesEntity = Object.assign(new SpeciesEntity, input)
        await this.creationRepository.create(entityToStore)
    }
}