export type UserDto = {
    id: number
    email: string
    name: string
    password: string
    vehicles: any
    createdAt: Date
    updatedAt: Date
}

export type CreateUserDto = {
    email: string
    name: string
    password: string
}

export type UpdateUserDto = Partial<Pick<UserDto, 'email' | 'name' | 'password'>>