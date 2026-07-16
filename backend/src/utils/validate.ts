import { ZodSchema } from "zod";

export const validate = <T>(

  schema: ZodSchema<T>,

  data: unknown

) => {

  return schema.parse(data);

};