import { z } from "zod";

export const DiscountSchema = z.object({
  discountDescription: z.string(),
  discountAmount: z.coerce.number(),
});

export type globalDiscountData = z.infer<typeof DiscountSchema>;
export const globalDiscountSchema = z.array(DiscountSchema);

export const DiscountUpdateSchema = z.object({
  id: z.number(),
  discountDescription: z.string(),
  discountAmount: z.coerce.number(),
});

export type globalUpdateDiscountData = z.infer<typeof DiscountUpdateSchema>;
export const globalUpdateDiscountSchema = z.array(DiscountUpdateSchema);

export const getDiscountDataSchema = z.object({
  id: z.number(),
  discountDescription: z.string(),
  discountAmount: z.coerce.number(),
});

export type globalGetDiscountData = z.infer<typeof getDiscountDataSchema>;
export const globalGetDiscountSchema = z.array(getDiscountDataSchema);

export const applyDiscountSchema = z.object({
  clientId: z.number(),
  discountId: z.number(),
  applyDiscount: z.boolean(),
});

export type globalApplyDiscountData = z.infer<typeof applyDiscountSchema>;
export const globalApplyDiscountSchema = z.array(applyDiscountSchema);
