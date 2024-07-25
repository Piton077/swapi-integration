import { Injectable } from '@nestjs/common';
import { CreationRepository } from 'src/core/domain/ports/repository/creation.repository';
import { SpeciesEntity } from 'src/core/domain/species/species.entity';
import { DynamoDBMapper } from '../dynamodb.mapper-annotation';
import { SpeciesDynamoDBMapper } from './mapper';
import { SpeciesDynamoDBFinderRepository } from './species-dynamodb.finder-repository';

@Injectable()
export class SpeciesDynamoDBCreationRepository implements CreationRepository<SpeciesEntity> {

    constructor(private finderRepository: SpeciesDynamoDBFinderRepository, private mapper: DynamoDBMapper) {
    }

    async create(entity: SpeciesEntity): Promise<SpeciesEntity> {
        const retrievedEntity = await this.finderRepository.findByName(entity.name)
        if (!retrievedEntity) throw new Error("The name is already taken")
        const schema = SpeciesDynamoDBMapper.fromEntity(entity);
        await this.mapper.getMapper().put(schema)
        return entity
    }

}
