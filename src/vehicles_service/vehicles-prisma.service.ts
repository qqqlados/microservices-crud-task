import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client-vehicles';

@Injectable()
export class VehiclesPrismaService
  extends PrismaClient
  implements OnModuleInit
{
  constructor() {
    super({
      datasources: {
        db_Vehicles: {
          url: process.env.PRISMA_DATABASE_URL_VEHICLES,
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
