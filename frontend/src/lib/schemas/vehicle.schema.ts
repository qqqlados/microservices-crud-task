import { z } from 'zod';

export const createVehicleSchema = z.object({
  make: z.string().min(1, { message: 'Make is required' }),
  model: z.string().min(1, { message: 'Model is required' }),
  year: z.coerce
    .number()
    .int()
    .gte(1886, { message: 'Year must be a valid number' })
    .lte(new Date().getFullYear() + 1, { message: 'Year must be realistic' }),
  vin: z.string().min(15, { message: 'VIN must be 15 characters long' }).max(15, { message: 'VIN must be 15 characters long' }),
  color: z.string().min(3, { message: 'Color is required' }),
  userId: z.coerce.number().int().positive(),
});

export type CreateVehicleFormValues = z.infer<typeof createVehicleSchema>;

export default createVehicleSchema;
