import { z } from "zod";

export const clientSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.string(),
  age: z.string(),
  gender: z.string(),
  address: z.string(),
  contactNumber: z.string(),
  isPriority: z.string(),
});
export type globalClientData = z.infer<typeof clientSchema>;
export const globalClientSchema = z.array(clientSchema);

export const forReviewSchema = z.object({
  userId: z.string(),
  clientId: z.number(),
  chemId: z.number(),
  clinicId: z.number(),
  hemaId: z.number(),
  immuId: z.number(),
  serologyHIVId: z.number(),
  serologyId: z.number(),
  fullName: z.string(),
});

export type globalClientForReviewData = z.infer<typeof forReviewSchema>;
export const globalClientForReview = z.array(forReviewSchema);
