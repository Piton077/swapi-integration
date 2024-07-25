import { Module } from "@nestjs/common";
import { FinderRepository } from "src/core/domain/ports/repository/finder.repository";
import { SpeciesEntity } from "src/core/domain/species/species.entity";
import { SpeciesSWAPIFinder } from "src/infrastructure/integrations/species/species-swapi.finder-repository";
import { SpeciesSWAPIModule } from "src/infrastructure/integrations/species/species-swapi.finder.module";
import { SpeciesDynamoDBModule } from "src/infrastructure/repository/dynamodb/species/species-dynamodb.module";
import { FinderEntityChainResponsability } from "./finder-entity.chain";



@Module({
    imports: [SpeciesDynamoDBModule.forFinding(), SpeciesSWAPIModule],
    providers: [{
        provide: FinderEntityChainResponsability,
        useFactory: (dynamoDBRepository: FinderRepository<SpeciesEntity>, swapiFinder: SpeciesSWAPIFinder) => {
            return new FinderEntityChainResponsability<SpeciesEntity>([dynamoDBRepository, swapiFinder])
        },
        inject: [FinderRepository, SpeciesSWAPIFinder]
    },],
    exports: [FinderEntityChainResponsability]
})
export class SpeciesFinderEntiyChainModule { }
