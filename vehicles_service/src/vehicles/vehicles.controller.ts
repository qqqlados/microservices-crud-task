import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateVehicleDto, UpdateVehicleDto } from 'src/dto/vehicle.dto';
import { VehiclesService } from './vehicles.service';
import { CustomInterceptor } from 'src/common/interceptors/custom.interceptor';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UserDto } from 'src/dto/user.dto';

@UseInterceptors(CustomInterceptor)
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehicleService: VehiclesService) {}

  @EventPattern('user-is-created')
  async createVehicleForNewUser(@Payload() dto: UserDto) {
    return this.vehicleService.createEmptyForUser(dto);
  }

  @Get()
  async getVehicles() {
    return this.vehicleService.getVehicles();
  }

  @Get('/:id')
  async getSingleVehicle(@Param('id', ParseIntPipe) id: number) {
    return this.vehicleService.getSingleVehicle(id);
  }

  @Post()
  async createVehicle(@Body() vehicle: CreateVehicleDto) {
    return this.vehicleService.createVehicle(vehicle);
  }

  @Put('/:id')
  async updateVehicle(
    @Param('id', ParseIntPipe) id: number,
    @Body() vehicle: UpdateVehicleDto,
  ) {
    return this.vehicleService.updateVehicle(id, vehicle);
  }

  @Delete('/:id')
  async deleteVehicle(@Param('id', ParseIntPipe) id: number) {
    return this.vehicleService.deleteVehicle(id);
  }
}
