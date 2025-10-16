export interface IVehicle {
  id: number;
  userId: number;
  make: string;
  model: string;
  year: number;
  vin: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateVehicle extends Omit<IVehicle, 'id' | 'userId' | 'createdAt' | 'updatedAt'> {}

export interface IUpdateVehicle extends Partial<Omit<IVehicle, 'id' | 'userId' | 'createdAt' | 'updatedAt'>> {}
