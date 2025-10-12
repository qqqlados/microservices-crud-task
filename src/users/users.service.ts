import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor( private prisma: PrismaService) {}

    async getUsers() {
        try {
            const users = await this.prisma.user.findMany()
            return users
        } catch (err) {
            throw new Error(err.message)
        }
    }

    async getSingleUser(id: number) {
        try {
            const users = await this.prisma.user.findFirst({
                where: {
                    id
                }
            })
            return users
        } catch (err) {
            throw new Error(err.message)
        }
    }

    async createUser(dto: CreateUserDto) {
        try {
            const createdUser = await this.prisma.user.create({
                data: dto
            })
            return {
                type: 'USER_CREATED',
                data: {
                    id: createdUser.id,
                    email: createdUser.email
                }
            }

        } catch (err) {
            throw new Error(err.message)
        }
    }

    async updateUser(id: number, dto: UpdateUserDto) {
        try {
            const updatedUser = await this.prisma.user.update({
              data: dto,
              where: {
                id
              }
            })
            return updatedUser
        } catch (err) {
            throw new Error(err.message)
        }
    }

    async deleteUser(id: number) {
        try {
            await this.prisma.user.delete({
              where: {
                id
              }
            })
        } catch (err) {
            throw new Error(err.message)
        }
    }
    
}
