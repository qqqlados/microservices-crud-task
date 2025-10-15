import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto } from './dto/user.dto';
import { UsersPrismaService } from './users-prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: UsersPrismaService) {}

  async getUsers(): Promise<UserDto[]> {
    try {
      const users = await this.prisma.user.findMany();
      return users;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getSingleUser(id: number) {
    try {
      const users = await this.prisma.user.findFirst({
        where: {
          id,
        },
      });
      return users;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async createUser(dto: CreateUserDto) {
    try {
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
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    try {
      const updatedUser = await this.prisma.user.update({
        data: dto,
        where: {
          id,
        },
      });
      return updatedUser;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async deleteUser(id: number) {
    try {
      await this.prisma.user.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
