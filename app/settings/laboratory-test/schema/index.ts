import { z } from "zod";

export const LabTestSchema = z.object({
  testName: z.string(),
  testCategory: z.string(),
  price: z.string(),
  description: z.string(),
  additionalNotes: z.string(),
});

export type globalLabTestData = z.infer<typeof LabTestSchema>;
export const globalLabTestSchema = z.array(LabTestSchema);
