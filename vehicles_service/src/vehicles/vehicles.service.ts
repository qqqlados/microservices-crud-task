import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateVehicleDto, UpdateVehicleDto } from 'src/dto/vehicle.dto';
import { ConflictException } from '@nestjs/common';
import { UserDto } from 'src/dto/user.dto';

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}

  async createEmptyForUser(dto: UserDto) {
    await this.prisma.vehicle.create({
      data: {
        make: null,
        model: null,
        year: null,
        color: null,
        userId: dto.id,
      },
    });
    console.log(`Created empty vehicle for new user with id ${dto.id}`);
  }

  async getVehicles() {
    const vehicles = await this.prisma.vehicle.findMany();
    return vehicles;
  }

  async getSingleVehicle(id: number) {
    const targetVehicle = await this.prisma.vehicle.findFirst({
      where: {
        id,
      },
    });
    return targetVehicle;
  }

  async createVehicle(dto: CreateVehicleDto) {
    await this.prisma.$transaction(async (tx) => {
      const isDuplicateVin = await tx.vehicle.findFirst({
        where: {
          vin: dto.vin,
        },
      });

      if (isDuplicateVin) {
        throw new ConflictException(
          'The vehicle with provided VIN already exists',
        );
      }

      await tx.vehicle.create({
        data: {
          make: dto.make,
          model: dto.model,
          year: dto.year,
          vin: dto.vin,
          color: dto.color,
          userId: dto.userId,
        },
      });

      return {
        type: 'VEHICLE_CREATED',
        data: {
          make: 'Unknown',
          model: 'Unknown',
          year: null,
          user_id: dto.userId,
        },
      };
    });
  }

  async updateVehicle(id: number, dto: UpdateVehicleDto) {
    const updatedVehicle = await this.prisma.vehicle.update({
      data: dto,
      where: {
        id,
      },
    });
    return updatedVehicle;
  }

  async deleteVehicle(id: number) {
    await this.prisma.vehicle.delete({
      where: {
        id,
      },
    });
  }
}
