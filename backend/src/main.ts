import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  // });
  // app.use(LoggingMiddleware)
  // app.useGlobalGuards(new AuthGuard());
  // app.useGlobalInterceptors(new CustomInterceptor())

  app.enableCors({
    origin: 'http://localhost:5173', // адреса твого фронтенду
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

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

  // await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
