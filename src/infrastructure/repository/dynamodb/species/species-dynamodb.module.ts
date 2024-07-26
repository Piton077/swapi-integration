import { DynamicModule, Module } from "@nestjs/common";
import { FinderRepository } from "src/core/domain/ports/repository/finder.repository";
import { WritingRepository } from "src/core/domain/ports/repository/writing.repository";
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
            providers: [{ provide: WritingRepository, useClass: SpeciesDynamoDBCreationRepository }, { provide: FinderRepository, useClass: SpeciesDynamoDBFinderRepository }],
            exports: [WritingRepository]
        }
    }

}
