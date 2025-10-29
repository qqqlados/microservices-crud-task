import z, { email } from 'zod';

export const createUserSchema = z
  .object({
    email: z.string().email({ message: 'Некоректний формат email' }),
    name: z.string().min(2, { message: 'Ім’я має містити мінімум 2 символи' }),
    password: z
      .string()
      .min(6, { message: 'Пароль має бути мінімум 6 символів' }),
  })
  .required();

export type CreateUserDto = z.infer<typeof createUserSchema>;
