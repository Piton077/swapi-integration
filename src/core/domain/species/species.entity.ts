import { BaseEntity } from "../base/base.entity";
import { Translatable } from "../decorator/property.decorator";

export class SpeciesEntity extends BaseEntity {

    @Translatable()
    average_height: number

    @Translatable()
    average_lifespan: number

    @Translatable()
    classification: string

    @Translatable()
    created: string

    @Translatable()
    designation: string

    @Translatable()
    edited: string

    @Translatable()
    eye_colors: string[]

    @Translatable()
    hair_colors: string[]

    @Translatable()
    homeworld: string

    @Translatable()
    language: string

    @Translatable()
    name: string

    @Translatable()
    skin_colors: string[]

    constructor() {
        super();
    }
}