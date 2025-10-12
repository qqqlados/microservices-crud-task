import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes } from '@nestjs/common';
import type { VehicleDto, CreateVehicleDto, UpdateVehicleDto } from './dto/vehicle.dto';
import { VehiclesService } from './vehicles.service';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehicleService: VehiclesService) {}

  @Get()
  async getVehicles() {
    return this.vehicleService.getVehicles()
  }

  @Get('/:id')
  async getSingleUser(@Param('id', ParseIntPipe) id: number) {
    return this.vehicleService.getSingleVehicle(id)
  }

  @Post()
  async createUser(@Body() user: CreateVehicleDto) {
    return this.vehicleService.createVehicle(user)
  }

  @Put('/:id')
   async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateVehicleDto) {
    return this.vehicleService.updateVehicle(id, user)
  }

  @Delete('/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.vehicleService.deleteVehicle(id)
  }
}
