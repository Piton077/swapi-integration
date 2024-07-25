import { Module } from "@nestjs/common";
import { SpeciesDynamoDBModule } from "src/infrastructure/repository/dynamodb/species/species-dynamodb.module";
import { FinderSpeciesModule } from "../finder-species/finder-species.module";
import { CreateSpeciesServices } from "./create-species.service";



@Module({
    imports: [SpeciesDynamoDBModule.forStoring(), FinderSpeciesModule],
    providers: [CreateSpeciesServices,
    ],
    exports: [CreateSpeciesServices]
})
export class CreateSpeciesModule { }