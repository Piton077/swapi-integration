import { Module } from "@nestjs/common";
import { SpeciesDynamoDBCreationRepository } from "src/infrastructure/repository/dynamodb/species/species-dynamodb.creation-repository";
import { SpeciesDynamoDBFinderRepository } from "src/infrastructure/repository/dynamodb/species/species-dynamodb.finder-repository";
import { SpeciesDynamoDBModule } from "src/infrastructure/repository/dynamodb/species/species-dynamodb.module";
import { CreateSpeciesServices } from "./create-species.service";



@Module({
    imports: [SpeciesDynamoDBModule.forStoring(), SpeciesDynamoDBModule.forFinding()],
    providers: [{
        provide: CreateSpeciesServices,
        useFactory(finderRepository, writingRepository) {
            return new CreateSpeciesServices(writingRepository, finderRepository)
        },
        inject: [SpeciesDynamoDBFinderRepository, SpeciesDynamoDBCreationRepository]
    },
    ],
    exports: [CreateSpeciesServices]
})
export class CreateSpeciesModule { }