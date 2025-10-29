import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [UsersModule],
})
export class AppModule {}
