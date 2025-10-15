import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { LoggingMiddleware } from 'src/common/middlewares/logging-middleware';
import { UsersPrismaService } from './users-prisma.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersPrismaService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.GET });
  }
}
