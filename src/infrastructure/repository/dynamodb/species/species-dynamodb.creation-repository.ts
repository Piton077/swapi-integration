import { Injectable } from '@nestjs/common';
import { WritingRepository } from 'src/core/domain/ports/repository/writing.repository';
import { SpeciesEntity } from 'src/core/domain/species/species.entity';
import { DynamoDBMapper } from '../dynamodb.mapper-annotation';
import { SpeciesDynamoDBMapper } from './mapper';

@Injectable()
export class SpeciesDynamoDBCreationRepository implements WritingRepository<SpeciesEntity> {

    constructor(private mapper: DynamoDBMapper) {
    }

    async create(entity: SpeciesEntity): Promise<SpeciesEntity> {
        const schema = SpeciesDynamoDBMapper.fromEntity(entity);
        schema.created = new Date().toISOString()
        await this.mapper.getMapper().put(schema)
        return entity
    }

}
