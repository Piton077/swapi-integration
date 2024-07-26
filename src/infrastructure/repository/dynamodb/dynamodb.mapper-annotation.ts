import { DataMapper } from "@aws/dynamodb-data-mapper";
import { Injectable } from "@nestjs/common";
import { DynamoDB } from "aws-sdk";

@Injectable()
export class DynamoDBMapper {
    private mapper: DataMapper
    constructor() {
        let dynamoDbClient = new DynamoDB()
        if (process.env.ENV == 'dev') {
            dynamoDbClient = new DynamoDB({
                region: 'localhost',
                endpoint: process.env.DYNAMODB_LOCAL_URL,
            })
        }
        this.mapper = new DataMapper({ client: dynamoDbClient });
    }
    getMapper() {
        return this.mapper
    }
}