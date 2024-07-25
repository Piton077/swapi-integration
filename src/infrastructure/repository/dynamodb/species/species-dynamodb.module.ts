import { DynamicModule, Module } from "@nestjs/common";
import { CreationRepository } from "src/core/domain/ports/repository/creation.repository";
import { FinderRepository } from "src/core/domain/ports/repository/finder.repository";
import { DynamoDBModule } from "../dynamodb.module";
import { SpeciesDynamoDBCreationRepository } from "./species-dynamodb.creation-repository";
import { SpeciesDynamoDBFinderRepository } from "./species-dynamodb.finder-repository";



@Module({})
export class SpeciesDynamoDBModule {

    static forFinding(): DynamicModule {
        return {
            module: SpeciesDynamoDBModule,
            imports: [DynamoDBModule],
            providers: [{ provide: FinderRepository, useClass: SpeciesDynamoDBFinderRepository }],
            exports: [FinderRepository]
        }
    }
    static forStoring(): DynamicModule {
        return {
            module: SpeciesDynamoDBModule,
            imports: [DynamoDBModule],
            providers: [{ provide: CreationRepository, useClass: SpeciesDynamoDBCreationRepository }, { provide: FinderRepository, useClass: SpeciesDynamoDBFinderRepository }],
            exports: [CreationRepository]
        }
    }

}
