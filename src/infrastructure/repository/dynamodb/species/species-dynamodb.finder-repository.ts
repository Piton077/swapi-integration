import { ResourceNotFoundException } from '@aws-sdk/client-dynamodb';
import { Injectable } from '@nestjs/common';
import { FinderRepository } from 'src/core/domain/ports/repository/finder.repository';
import { SpeciesEntity } from 'src/core/domain/species/species.entity';
import { DynamoDBMapper } from '../dynamodb.mapper-annotation';
import { SpeciesDynamoDBMapper } from './mapper';
import { SpeciesSchema } from './species.schema';

@Injectable()
export class SpeciesDynamoDBFinderRepository implements FinderRepository<SpeciesEntity> {

    constructor(private mapper: DynamoDBMapper) {
    }

    async findByName(name: string): Promise<SpeciesEntity | null> {
        try {
            const schema = await this.mapper.getMapper().get(Object.assign(new SpeciesSchema, { name }))
            return SpeciesDynamoDBMapper.fromSchema(schema);
        } catch (error) {
            if (error.name === ResourceNotFoundException.name) {
                return null
            }
            throw error
        }

    }


}
