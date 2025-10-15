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
import { HttpExceptionFilter } from 'src/common/exception-filters/http-exception.filter';

@UseGuards(AuthGuard)
@UseInterceptors(CustomInterceptor)
// @UseFilters(new HttpExceptionFilter())
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
