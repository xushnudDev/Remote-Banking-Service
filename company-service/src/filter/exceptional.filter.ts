import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { BaseResponse, ErrorField, ErrorResponse } from 'src/modules/company/common';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as any;

    const errorFields: ErrorField[] = [];

    if (status === 400 && Array.isArray(exceptionResponse?.message)) {
      for (const msg of exceptionResponse.message) {
        const property = msg.split(' ')[0]; 
        errorFields.push({
          name: property,
          message: msg,
        });
      }
    }

    const error: ErrorResponse = {
      code: status,
      message: errorFields.length > 0 ? 'Validation failed' : (exceptionResponse.message || 'Unexpected Error'),
      cause: exceptionResponse.error || 'Bad Request',
      fields: errorFields.length > 0 ? errorFields : undefined,
    };

    const res: BaseResponse<any> = {
      success: false,
      data: null,
      error,
    };

    response.status(status).json(res);
  }
}
