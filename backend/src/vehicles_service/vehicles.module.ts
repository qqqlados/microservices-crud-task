import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { VehiclesPrismaService } from './vehicles-prisma.service';

@Module({
  controllers: [VehiclesController],
  providers: [VehiclesService, VehiclesPrismaService],
})
export class VehiclesModule {}
