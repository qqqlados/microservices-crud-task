import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://user:password@rabbitmq:5672'],
      queue: 'users-queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();
  console.log('✅ Vehicles microservice is listening for messages...');

  await app.listen(3000, '0.0.0.0');
  console.log(`✅ HTTP server is listening on port 3001...`);
}
bootstrap();
