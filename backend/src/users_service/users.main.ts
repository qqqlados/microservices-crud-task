// import { NestFactory } from '@nestjs/core';
// import { Transport, MicroserviceOptions } from '@nestjs/microservices';
// import { UsersModule } from './users.module';

// async function bootstrap() {
//   const app = await NestFactory.createMicroservice<MicroserviceOptions>(
//     UsersModule,
//     {
//       transport: Transport.RMQ,
//       options: {
//         urls: ['amqp://localhost:5672'],
//         queue: 'users_queue',
//       },
//     },
//   );
//   await app.listen();
// }
// bootstrap();
