import { Body, Controller, Post } from "@nestjs/common";
import { CreateSpeciesServices } from "src/core/application/create-species/create-species.service";
import { CreateSpeciesInputDto } from "./dto/create-species.input.dto";

@Controller("/species")
export class CreateSpeciesController {
    constructor(private readonly service: CreateSpeciesServices) { }

    @Post()
    findByName(
        @Body() body: CreateSpeciesInputDto
    ) {

        return this.service.create(body);
    }
}