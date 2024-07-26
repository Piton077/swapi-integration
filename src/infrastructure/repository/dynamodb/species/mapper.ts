import { Identifier } from "src/core/domain/base/identifier";
import { SpeciesEntity } from "src/core/domain/species/species.entity";
import { SpeciesSchema } from "./species.schema";

export class SpeciesDynamoDBMapper {

    static fromEntity(entity: SpeciesEntity): SpeciesSchema {
        const schema = Object.assign(new SpeciesSchema, entity)
        schema.edited = ""
        schema.created = ""
        return schema
    }

    static fromSchema(schema: SpeciesSchema): SpeciesEntity {
        const entityLoaded = Object.assign(new SpeciesEntity(), schema)
        entityLoaded.identifier = new Identifier(schema.name)
        return entityLoaded
    }
}