import { Module } from "@nestjs/common";
import { CreateSpeciesModule } from "src/core/application/create-species/create-species.module";
import { FinderSpeciesModule } from "src/core/application/finder-species/finder-species.module";
import { SpeciesController } from "./species.controller";


@Module({
    imports: [CreateSpeciesModule, FinderSpeciesModule],
    controllers: [SpeciesController]

})
export class SpeciesModule { }