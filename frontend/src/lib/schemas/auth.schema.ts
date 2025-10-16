import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().nonempty('Email is required').email('Invalid email address format'),

  password: z.string().min(6, 'Password must be at least 6 characters long').min(1, 'Password is required'),
});

export type SignInFormValues = z.infer<typeof signInSchema>;
