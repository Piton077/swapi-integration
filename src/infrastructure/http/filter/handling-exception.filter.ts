import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomError } from 'src/core/domain/errors/base.error';
import { DuplicateSpeciesError } from 'src/core/domain/errors/species/duplicate-species.error';
import { SpeciesNotFoundError } from 'src/core/domain/errors/species/species-not-found.error';
import { TranslateError } from 'src/core/domain/errors/translate-error';

@Catch(CustomError)
export class HandlingExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = this.mapToHttpCode(exception);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
  mapToHttpCode(exception: Error) {
    if (exception instanceof DuplicateSpeciesError) {
      return HttpStatus.CONFLICT;
    }
    if (exception instanceof SpeciesNotFoundError) {
      return HttpStatus.NOT_FOUND;
    }
    if (exception instanceof TranslateError) {
      return HttpStatus.CONFLICT;
    }
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
