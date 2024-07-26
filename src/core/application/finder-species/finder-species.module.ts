import { Module } from "@nestjs/common";
import { ItalianDictionary } from "src/core/domain/dictionaries/italian.dictionary";
import { SpanishDictionary } from "src/core/domain/dictionaries/spanish.dictionary";
import { SpeciesEntity } from "src/core/domain/species/species.entity";
import { FinderEntityLink } from "../helpers/finder-entity-chain/finder-entity.director";
import { SpeciesFinderEntiyChainModule } from "../helpers/finder-entity-chain/species.finder-entity.chain.module";
import { FinderSpeciesService } from "./finder-species.services";



@Module({
    imports: [SpeciesFinderEntiyChainModule],
    providers: [
        {
            provide: FinderSpeciesService,
            useFactory(finderRepository: FinderEntityLink<SpeciesEntity>) {
                return new FinderSpeciesService([new SpanishDictionary(), new ItalianDictionary()], finderRepository)
            },
            inject: [FinderEntityLink]
        }

    ],
    exports: [FinderSpeciesService]
})
export class FinderSpeciesModule { }