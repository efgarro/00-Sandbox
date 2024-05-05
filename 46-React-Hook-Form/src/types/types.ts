import * as z from "zod";

export const schema = z.object({
  place_type: z.string(),
  region: z.string(),
  hub: z.string().min(6, { message: "Error !!!" }),
  name: z.string(),
  description: z
    .string()
    .min(20, { message: "Description must be at least 50 chars long" }),
  latitude: z
    .string()
    .regex(
      /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/,
      {
        message:
          "Invalid LATITUDE format. Please review that decimals are 6 max and that no alpha characters are included",
      }
    ),
  // .refine(
  //   (val) => {
  //     const decimals = val.substring(val.indexOf("."));
  //     return decimals.length <= 7 ? true : false;
  //   },
  //   {
  //     message: "Can't have more than 6 decimals",
  //   }
  // ),
  longitude: z
    .string()
    .regex(
      /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/,
      {
        message:
          "Invalid LONGITUDE format. Please review that decimals are 6 max and that no alpha characters are included",
      }
    ),
});

export interface FormInputs {
  place_type: string;
  region: string;
  hub: string;
  name: string;
  description: string;
  latitude: string;
  longitude: string;
}

// export interface IBaseAttrInputs {
// }
