import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from 'src/dto/user.dto';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

//@UseGuards(AuthGuard)
// @UseFilters(new HttpExceptionFilter())
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @MessagePattern('get_users')
  // getMicroserviceUsers() {
  //   console.log('Received message in USERS microservice');
  //   return [{ id: 1, name: 'John Doe' }];
  // }

  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }
  //@UseInterceptors(CustomInterceptor)
  @Get('me')
  async getCurrentUser(@Query('email') email: string) {
    return this.usersService.getCurrentUser(email);
  }

  @Get('/:id')
  async getSingleUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getSingleUser(id);
  }

  @Post()
  // @UsePipes(new ValidationPipe({ whitelist: true }))
  // @UseFilters(new HttpExceptionFilter())
  async createUser(
    @Body()
    dto: CreateUserDto,
  ) {
    return this.usersService.createUser(dto);
  }

  @Put('/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, user);
  }

  @Delete('/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
