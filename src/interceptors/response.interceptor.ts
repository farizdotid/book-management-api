import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";

interface Response<T> {
    status:String;
    message:String;
    data:T;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        status: 'success',
        message: 'Request successful',
        data,
      })),
    );
  }
}