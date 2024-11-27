import { z } from 'zod';

export const searchParamsSchema = z.object({
  search: z.string().optional(),
  category: z.coerce.number().optional(),
  offset: z.coerce.number().optional(),
});

export const signupSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

export type SignupFormData = z.infer<typeof signupSchema>;
