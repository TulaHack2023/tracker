import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  Logger,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';

/**
 * Custom exception filter to convert EntityNotFoundError from TypeOrm to NestJs responses
 * @see also @https://docs.nestjs.com/exception-filters
 */

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  private readonly logger: Logger;
  constructor() {
    this.logger = new Logger();
  }
  catch(exception: Error, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? exception.message || exception.message
        : 'Internal server error';

    const errors =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      exception instanceof HttpException ? exception.getResponse().message : [];

    const devErrorResponse: any = {};

    this.logger.log(
      `request method: ${request.method} request url${request.url}`,
      JSON.stringify(devErrorResponse),
    );
    response.status(statusCode).json({
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      errorName: exception?.name,
      message: exception?.message,
      errors,
    });
  }
}
