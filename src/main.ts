import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(LoggingMiddleware)
  // app.useGlobalGuards(new AuthGuard());
  // app.useGlobalInterceptors(new CustomInterceptor())

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const formattedErrors = errors.map((error) => {
          const constraints = error.constraints;

          let constrainstArray: string[] = ['Error message is missing'];

          if (constraints) {
            Object.values(constraints).forEach((el) =>
              constrainstArray.push(el),
            );
          }
          return {
            field: error.property,
            message: constrainstArray,
          };
        });

        throw new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          code: 'VALIDATION_ERROR',
          message: 'Data sent did not pass the validation',
          errors: formattedErrors,
        });
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
