import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { AuthGuard } from 'src/common/guards/authGuard';
import { CustomInterceptor } from 'src/common/interceptors/custom.interceptor';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { MessagePattern } from '@nestjs/microservices';

@UseGuards(AuthGuard)
@UseInterceptors(CustomInterceptor)
// @UseFilters(new HttpExceptionFilter())
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('get_users')
  getMicroserviceUsers() {
    console.log('Received message in USERS microservice');
    return [{ id: 1, name: 'John Doe' }];
  }

  @Get()
  @UseGuards(AuthGuard)
  async getUsers() {
    return this.usersService.getUsers();
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
