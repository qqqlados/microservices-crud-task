import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('users_microservices')
  async getUsers() {
    return this.appService.getUsers();
  }

  @Get('vehicles_microservices')
  async getVehicles() {
    return this.appService.getVehicles();
  }
}
