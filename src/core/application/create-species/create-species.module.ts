import { Module } from "@nestjs/common";
import { SpeciesDynamoDBModule } from "src/infrastructure/repository/dynamodb/species/species-dynamodb.module";
import { CreatorSpeciesServices } from "./create-species.service";



@Module({
    imports: [SpeciesDynamoDBModule.forStoring()],
    providers: [CreatorSpeciesServices,
    ],
    exports: [CreatorSpeciesServices]
})
export class CreateSpeciesModule { }