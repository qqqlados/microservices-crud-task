export class VehicleDto {
  id: number;
  make: string;
  model: string;
  year: number;
  vin: string;
  color: string;
  userId: number;
}

export class CreateVehicleDto {
  make: string;
  model: string;
  year: number;
  vin: string;
  color: string;
  userId: number;
}

export class UpdateVehicleDto {
  make?: string;
  model?: string;
  year?: number;
  vin?: string;
  color?: string;
}
