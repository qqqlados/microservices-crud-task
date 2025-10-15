import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client-users';

@Injectable()
export class UsersPrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      datasources: {
        db_Users: {
          url: process.env.PRISMA_DATABASE_URL_USERS,
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
