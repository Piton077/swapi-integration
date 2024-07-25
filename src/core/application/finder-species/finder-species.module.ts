import { Module } from "@nestjs/common";
import { ItalianDictionary } from "src/core/domain/dictionaries/italian.dictionary";
import { SpanishDictionary } from "src/core/domain/dictionaries/spanish.dictionary";
import { FinderRepository } from "src/core/domain/ports/repository/finder.repository";
import { SpeciesEntity } from "src/core/domain/species/species.entity";
import { SpeciesDynamoDBModule } from "src/infrastructure/repository/dynamodb/species/species-dynamodb.module";
import { SpeciesFinderEntiyChainModule } from "../helpers/finder-entity-chain/species.finder-entity.chain.module";
import { FinderSpeciesService } from "./finder-species.services";



@Module({
    imports: [SpeciesFinderEntiyChainModule, SpeciesDynamoDBModule.forFinding()],
    providers: [{
        provide: FinderSpeciesService,
        useFactory(finderRepository: FinderRepository<SpeciesEntity>) {
            return new FinderSpeciesService([new SpanishDictionary(), new ItalianDictionary()], finderRepository)
        },
        inject: [FinderRepository]
    }
    ],
    exports: [FinderSpeciesService]
})
export class FinderSpeciesModule { }