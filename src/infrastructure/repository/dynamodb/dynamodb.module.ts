import { Module } from "@nestjs/common";
import { DynamoDBMapper } from "./dynamodb.mapper-annotation";





@Module({
    imports: [],
    providers: [DynamoDBMapper],
    exports: [DynamoDBMapper]
})
export class DynamoDBModule { }
