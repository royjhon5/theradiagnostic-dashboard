import { z } from "zod";

export const SignatorySchema = z.object({
  id: z.number(),
  signatoryName: z.string(),
  signatoryPosition: z.string(),
  signatureImage: z.string(),
  licenseNumber: z.string().optional().nullable(),
  professionalTitle: z.string(),
});

export type globalSignatoryData = z.infer<typeof SignatorySchema>;
export const globalSignatorySchema = z.array(SignatorySchema);
