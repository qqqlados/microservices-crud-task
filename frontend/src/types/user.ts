export interface IUser {
  id: number;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateUser extends Partial<Pick<IUser, 'email' | 'name' | 'password'>> {}

export interface IUpdateUser extends Partial<Pick<IUser, 'email' | 'name' | 'password'>> {}
