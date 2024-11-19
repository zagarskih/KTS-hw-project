import { z } from 'zod';

export const searchParamsSchema = z.object({
  search: z.string().optional(),
  category: z.coerce.number().optional(),
  offset: z.coerce.number().optional(),
});
