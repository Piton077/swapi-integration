import { DataMapper } from "@aws/dynamodb-data-mapper";
import { Injectable } from "@nestjs/common";
import { DynamoDB } from "aws-sdk";

@Injectable()
export class DynamoDBMapper {
    private mapper: DataMapper
    constructor() {
        const dynamoDbClient = new DynamoDB()
        this.mapper = new DataMapper({ client: dynamoDbClient });
    }
    getMapper() {
        return this.mapper
    }
}