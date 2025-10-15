import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class CustomInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>();
    const now = Date.now();
    const methodName = context.getHandler().name;
    const controllerName = context.getClass().name;

    console.log(`[${controllerName}.${methodName}] Incoming Request...`);

    return next.handle().pipe(
      map((data) => ({
        data,
        timestamp: new Date().toISOString(),
      })),
      tap(() => {
        console.log(
          `[${controllerName}.${methodName}] End Request, took ${Date.now() - now}ms`,
        );
      }),
    );
  }
}
