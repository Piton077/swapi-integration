import { DynamicModule, Module } from "@nestjs/common";
import { DynamoDBModule } from "../dynamodb.module";
import { SpeciesDynamoDBCreationRepository } from "./species-dynamodb.creation-repository";
import { SpeciesDynamoDBFinderRepository } from "./species-dynamodb.finder-repository";



@Module({})
export class SpeciesDynamoDBModule {

    static forFinding(): DynamicModule {
        return {
            module: SpeciesDynamoDBModule,
            imports: [DynamoDBModule],
            providers: [SpeciesDynamoDBFinderRepository],
            exports: [SpeciesDynamoDBFinderRepository]
        }
    }
    static forStoring(): DynamicModule {
        return {
            module: SpeciesDynamoDBModule,
            imports: [DynamoDBModule],
            providers: [SpeciesDynamoDBCreationRepository],
            exports: [SpeciesDynamoDBCreationRepository]
        }
    }

}
