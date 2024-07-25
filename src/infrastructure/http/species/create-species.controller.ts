import { Body, Controller, Post } from "@nestjs/common";
import { CreateSpeciesServices } from "src/core/application/create-species/create-species.service";

@Controller()
export class CreateSpeciesController {
    constructor(private readonly service: CreateSpeciesServices) { }

    @Post()
    findByName(
        @Body() body: any
    ) {

        return this.service.create(body);
    }
}