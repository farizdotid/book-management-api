import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  
  @Catch(HttpException)
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      const status = exception.getStatus();
  
      const exceptionResponse: any = exception.getResponse();
      const errorMessage =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : exceptionResponse.message || 'An error occurred';
  
      response.status(status).json({
        status: 'error',
        message: errorMessage,
        errors: exceptionResponse,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }
  