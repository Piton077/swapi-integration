import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { SpeciesSWAPIFinder } from "./species-swapi.finder-repository";


@Module({
    imports: [HttpModule],
    providers: [SpeciesSWAPIFinder],
    exports: [SpeciesSWAPIFinder]
})
export class SpeciesSWAPIModule { }
