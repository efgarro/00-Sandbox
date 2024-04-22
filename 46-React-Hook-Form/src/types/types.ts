import * as z from 'zod';

export const schema = z.object({
  name: z.string().min(1, { message: 'Required' }),
  age: z.number().min(10),
});
