import { z } from "zod";

export const LabTestSchema = z.object({
  id: z.number().optional(),
  testName: z.string(),
  testCategory: z.string(),
  price: z.coerce.number(),
});

export type globalLabTestData = z.infer<typeof LabTestSchema>;
export const globalLabTestSchema = z.array(LabTestSchema);

export const LabTestUpdateSchema = z.object({
  id: z.number(),
  testName: z.string(),
  testCategory: z.string(),
  price: z.coerce.number(),
});

export type globalUpdateTestData = z.infer<typeof LabTestUpdateSchema>;
export const globalUpdateTestSchema = z.array(LabTestUpdateSchema);
