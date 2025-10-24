// import { NestFactory } from '@nestjs/core';
// import { Transport, MicroserviceOptions } from '@nestjs/microservices';
// import { VehiclesModule } from './vehicles.module';

// async function bootstrap() {
//   const app = await NestFactory.createMicroservice<MicroserviceOptions>(
//     VehiclesModule,
//     {
//       transport: Transport.RMQ,
//       options: {
//         urls: ['amqp://localhost:5672'],
//         queue: 'vehicles_queue',
//       },
//     },
//   );
//   await app.listen();
// }
// bootstrap();
