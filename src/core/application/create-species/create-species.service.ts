import { Inject, Injectable } from "@nestjs/common";
import { CreationRepository } from "src/core/domain/ports/repository/creation.repository";
import { FinderRepository } from "src/core/domain/ports/repository/finder.repository";
import { CreatorBaseService } from "src/core/domain/ports/services/creator-base.service";
import { SpeciesEntity } from "src/core/domain/species/species.entity";


@Injectable()
export class CreateSpeciesServices implements CreatorBaseService<any, any> {

    constructor(@Inject(FinderRepository) private finderRepository: FinderRepository<SpeciesEntity>, @Inject(CreationRepository) private creationRepository: CreationRepository<SpeciesEntity>) {

    }

    async create(input: any) {
        const entity = await this.finderRepository.findByName(input.name)
        if (entity) return entity
        const entityToStore: SpeciesEntity = Object.assign(new SpeciesEntity, input)
        await this.creationRepository.create(entityToStore)
    }
}