import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name should be between 1 and 50 characters").max(50),
  price: z
    .string()
    .min(1, "Price should be between Ksh 1 and  Ksh 1M")
    .max(1000000),
  description: z.string(),
});

export type ProductFormData = z.infer<typeof productSchema>;
