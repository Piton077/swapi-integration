import { attribute, hashKey, table } from "@aws/dynamodb-data-mapper-annotations"


@table('Species')
export class SpeciesSchema {

    @hashKey()
    id: string
    @attribute()
    average_height: number
    @attribute()
    average_lifespan: number
    @attribute()
    classification: string
    @attribute()
    created: string
    @attribute()
    designation: string
    @attribute()
    edited: string
    @attribute()
    eye_colors: string[]
    @attribute()
    hair_colors: string[]
    @attribute()
    homeworld: string
    @attribute()
    language: string
    @attribute()
    name: string
    @attribute()
    skin_colors: string
}
