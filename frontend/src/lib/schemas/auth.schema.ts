import { z } from 'zod';

export const signInSchema = z.object({
  email: z.email('Invalid email address format').nonempty('Email is required'),

  password: z.string().min(6, 'Password must be at least 6 characters long').min(1, 'Password is required'),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  email: z.string().nonempty('Email is required').email('Invalid email address format'),
  name: z.string().min(5, 'Name must be at least 5 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;
