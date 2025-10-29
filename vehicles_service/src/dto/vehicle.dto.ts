import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  Max,
  Length,
  MinLength,
} from 'class-validator';

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
  @IsString({ message: 'Make must be a string' })
  @IsNotEmpty({ message: 'Make is required' })
  @MaxLength(50, { message: 'Make cannot exceed 50 characters' })
  make: string;

  @IsString({ message: 'Model must be a string' })
  @IsNotEmpty({ message: 'Model is required' })
  @MaxLength(50, { message: 'Model cannot exceed 50 characters' })
  model: string;

  @IsNumber({}, { message: 'Year must be a number' })
  @IsNotEmpty({ message: 'Year is required' })
  @Min(1886, {
    message: 'Year must be later than 1886 (the year of the first car)',
  })
  @Max(new Date().getFullYear() + 1, {
    message: 'Year cannot be in the far future',
  })
  year: number;

  @IsString({ message: 'VIN must be a string' })
  @IsNotEmpty({ message: 'VIN is required' })
  @MinLength(15, { message: 'VIN must be 15 characters long' })
  @MaxLength(15, { message: 'VIN must be 15 characters long' })
  vin: string;

  @IsString({ message: 'Color must be a string' })
  @IsNotEmpty({ message: 'Color is required' })
  color: string;

  @IsNumber({}, { message: 'User ID must be a number' })
  @IsNotEmpty({ message: 'User ID is required' })
  userId: number;
}

export class UpdateVehicleDto {
  @IsOptional()
  @IsString({ message: 'Make must be a string' })
  @MaxLength(50, { message: 'Make cannot exceed 50 characters' })
  make?: string;

  @IsOptional()
  @IsString({ message: 'Model must be a string' })
  @MaxLength(50, { message: 'Model cannot exceed 50 characters' })
  model?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Year must be a number' })
  @Min(1886, { message: 'Year must be later than 1886' })
  @Max(new Date().getFullYear() + 1, {
    message: 'Year cannot be in the far future',
  })
  year?: number;

  @IsOptional()
  @IsString({ message: 'VIN must be a string' })
  @MaxLength(17, { message: 'VIN must be 17 characters long' })
  vin?: string;

  @IsOptional()
  @IsString({ message: 'Color must be a string' })
  color?: string;
}
