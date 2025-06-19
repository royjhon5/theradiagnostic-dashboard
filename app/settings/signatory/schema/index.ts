import { z } from "zod";

export const SignatorySchema = z.object({
  id: z.number().optional(),
  signatoryName: z.string(),
  signatoryPosition: z.string(),
  signatureImage: z.string(),
  licenseNumber: z.string(),
});

export type globalSignatoryData = z.infer<typeof SignatorySchema>;
export const globalSignatorySchema = z.array(SignatorySchema);
