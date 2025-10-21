import {
  IsString,
  IsDate,
  IsArray,
  IsEmail,
  MinLength,
  IsStrongPassword,
  IsNotEmpty,
} from 'class-validator';

export class UserDto {
  id: number;

  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}

export class CreateUserDto {
  @IsEmail(
    {},
    {
      message: 'Provided value is not email',
    },
  )
  @MinLength(7, {
    message: 'Email must contain at least 7 characters',
  })
  @IsString({
    message: 'Email must be the type of string',
  })
  email: string;

  @IsString()
  @MinLength(8)
  name: string;

  @MinLength(8)
  @IsStrongPassword()
  @IsString()
  password: string;
}

export class UpdateUserDto {
  email?: string;
  name?: string;
  password?: string;
}
