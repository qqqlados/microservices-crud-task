import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor() // @Inject('USERS_SERVICE') private readonly usersClient: ClientProxy,
  // @Inject('VEHICLES_SERVICE') private readonly vehiclesClient: ClientProxy,
  {}

  // getUsers() {
  //   return this.usersClient.send('get_users', {});
  // }

  // getVehicles() {
  //   return this.vehiclesClient.send('get_vehicles', {});
  // }
}
