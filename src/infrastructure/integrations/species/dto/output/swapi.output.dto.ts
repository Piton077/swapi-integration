export interface SWAPIOutputDto {
    count: number,
    next: string | null,
    previous: string | null,
    results: {

        average_height: number

        average_lifespan: number

        classification: string

        created: string

        designation: string

        edited: string

        eye_colors: string[]

        hair_colors: string[]

        homeworld: string

        language: string

        name: string

        skin_colors: string
    }[]
}