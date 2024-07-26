import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { configure as serverlessExpress } from '@vendia/serverless-express';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Callback, Context, Handler } from 'aws-lambda';
import { CreateSpeciesAppModule } from './create-species-function.module';
import { HandlingExceptionFilter } from './infrastructure/http/filter/handling-exception.filter';


let cachedServer: any = null;

export const handler: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback
): Promise<APIGatewayProxyResult> => {
  if (!cachedServer) {
    const app = await NestFactory.create(CreateSpeciesAppModule);
    app.useGlobalPipes(new ValidationPipe());
    if (process.env.ENV !== 'dev') {
      app.setGlobalPrefix('/api/v1');
    }
    app.useGlobalFilters(new HandlingExceptionFilter());
    await app.init();
    cachedServer = serverlessExpress({ app: app.getHttpAdapter().getInstance() });
  }
  return cachedServer(event, context, callback);
};
