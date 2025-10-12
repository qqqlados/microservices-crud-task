import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateVehicleDto, UpdateVehicleDto, VehicleDto } from './dto/vehicle.dto';

@Injectable()
export class VehiclesService {
    constructor( private prisma: PrismaService) {}

    async getVehicles() {
        try {
            const vehicles = await this.prisma.vehicle.findMany()
            return vehicles
        } catch (err) {
            throw new Error(err.message)
        }
    }

    async getSingleVehicle(id: number) {
        try {
            const targetVehicle = await this.prisma.vehicle.findFirst({
                where: {
                    id
                }
            })
            return targetVehicle
        } catch (err) {
            throw new Error(err.message)
        }
    }
    
    async createVehicle(dto: CreateVehicleDto) {
        try {
            await this.prisma.vehicle.create({
                data: {
                make: dto.make,
                model: dto.model,
                year: dto.year,
                vin: dto.vin,
                color: dto.color,
                user: {
                connect: { id: dto.userId }
                }
            },
            })
            return {
                type: 'VEHICLE_CREATED',
                data: {
                make: "Unknown", 
                model: "Unknown",  
                year: null,  
                user_id: dto.userId 
                }

            }

        } catch (err) {
            throw new Error(err.message)
        }
    }

    async updateVehicle(id: number, dto: UpdateVehicleDto) {
        try {
            const updatedVehicle = await this.prisma.vehicle.update({
              data: dto,
              where: {
                id
              }
            })
            return updatedVehicle
        } catch (err) {
            throw new Error(err.message)
        }
    }

    async deleteVehicle(id: number) {
        try {
            await this.prisma.vehicle.delete({
              where: {
                id
              }
            })
        } catch (err) {
            throw new Error(err.message)
        }
    }
    
}
