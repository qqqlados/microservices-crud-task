import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import type { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    return this.usersService.getUsers()
  }

  @Get('/:id')
  async getSingleUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getSingleUser(id)
  }

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user)
  }

  @Put('/:id')
   async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto) {
    return this.usersService.updateUser(id, user)
  }

  @Delete('/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id)
  }
}
