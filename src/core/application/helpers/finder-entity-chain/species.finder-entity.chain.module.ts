import { Module } from "@nestjs/common";
import { FinderRepository } from "src/core/domain/ports/repository/finder.repository";
import { SpeciesEntity } from "src/core/domain/species/species.entity";
import { SpeciesSWAPIFinder } from "src/infrastructure/integrations/species/species-swapi.finder-repository";
import { SpeciesSWAPIModule } from "src/infrastructure/integrations/species/species-swapi.finder.module";
import { SpeciesDynamoDBFinderRepository } from "src/infrastructure/repository/dynamodb/species/species-dynamodb.finder-repository";
import { SpeciesDynamoDBModule } from "src/infrastructure/repository/dynamodb/species/species-dynamodb.module";
import { FinderEntityLink } from "./finder-entity.director";



@Module({
    imports: [SpeciesDynamoDBModule.forFinding(), SpeciesSWAPIModule],
    providers: [{
        provide: FinderEntityLink,
        useFactory: (dynamoDBRepository: FinderRepository<SpeciesEntity>, swapiFinder: SpeciesSWAPIFinder) => {
            const mainRepository = new FinderEntityLink<SpeciesEntity>(dynamoDBRepository, false);
            const swapiReository = new FinderEntityLink<SpeciesEntity>(swapiFinder, true)
            mainRepository.setNext(swapiReository)
            return mainRepository
        },
        inject: [SpeciesDynamoDBFinderRepository, SpeciesSWAPIFinder]
    }
    ],
    exports: [FinderEntityLink]
})
export class SpeciesFinderEntiyChainModule { }
