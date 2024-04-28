import * as z from "zod";

export const schema = z.object({
  place_type: z.string(),
  region: z.string(),
  hub: z.string().min(6, { message: "Error !!!" }),
  // name: z.string().min(1).optional(),
  // age: z.number().min(10).optional(),
});

export interface FormInputs {
  place_type: string;
  region: string;
  hub: string;
}



