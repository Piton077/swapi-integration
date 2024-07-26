import { attribute, hashKey, table } from "@aws/dynamodb-data-mapper-annotations"


@table(process.env.DYNAMODB_TABLE)
export class SpeciesSchema {

    @hashKey()
    name: string
    @attribute()
    average_height?: number
    @attribute()
    average_lifespan?: number
    @attribute()
    classification?: string
    @attribute()
    created?: string
    @attribute()
    edited?: string
    @attribute()
    designation?: string
    @attribute()
    eye_colors?: string[]
    @attribute()
    hair_colors?: string[]
    @attribute()
    homeworld?: string
    @attribute()
    language?: string
    @attribute()
    skin_colors?: string[]
}
