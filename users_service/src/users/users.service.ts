import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  EventPattern,
  Transport,
} from '@nestjs/microservices';
import { CreateUserDto, UpdateUserDto, UserDto } from 'src/dto/user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    @Inject('USERS_SERVICE') private rabbitClient: ClientProxy,
  ) {}

  async getUsers(): Promise<UserDto[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async console() {
    console.log(`Vehicle created for user with ID`);
  }

  async getSingleUser(id: number) {
    const users = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
    return users;
  }

  async getCurrentUser(email: string) {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async createUser(dto: CreateUserDto) {
    const createdUser = await this.prisma.user.create({
      data: dto,
    });
    this.rabbitClient.emit('user-is-created', createdUser);

    return {
      type: 'USER_CREATED',
      data: {
        id: createdUser.id,
        email: createdUser.email,
      },
    };
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    const updated = await this.prisma.user.update({
      where: {
        id,
      },
      data: dto,
    });

    return {
      name: updated.name,
      email: updated.email,
    };
  }

  async deleteUser(id: number) {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
