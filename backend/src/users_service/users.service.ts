import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto } from './dto/user.dto';
import { UsersPrismaService } from './users-prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: UsersPrismaService) {}

  async getUsers(): Promise<UserDto[]> {
    const users = await this.prisma.user.findMany();
    return users;
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
