import { z } from "zod";

export const idSchema = z.object({
  id: z.string().min(1, "Id is required"),
});

export const paginationSchema = z.object({
  page: z.coerce.number().min(1).optional(),

  limit: z.coerce.number().min(1).max(100).optional(),
});