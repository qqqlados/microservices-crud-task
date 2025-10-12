export interface VehicleDto {
  id: number
  make: string;
  model: string;
  year: number;
  vin: string;
  color: string;
  userId: number;
};

export interface CreateVehicleDto extends Omit<VehicleDto, 'id'> {}

export type UpdateVehicleDto = Partial<Omit<VehicleDto, 'id' | 'userId'>>