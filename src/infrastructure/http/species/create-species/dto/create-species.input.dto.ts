import { ArrayMinSize, ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';


export class CreateSpeciesInputDto {

    @IsNumber()
    @Min(0)
    average_height: number

    @IsNumber()
    @Min(1)
    average_lifespan: number

    @IsString()
    @IsNotEmpty()
    classification: string

    @IsString()
    @IsNotEmpty()
    designation: string


    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @IsString({ each: true })
    eye_colors: string[]

    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @IsString({ each: true })
    hair_colors: string[]

    @IsString()
    @IsNotEmpty()
    homeworld: string

    @IsString()
    @IsNotEmpty()
    language: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @IsString({ each: true })
    skin_colors: string[]
}