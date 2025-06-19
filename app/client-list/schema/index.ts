import { z } from "zod";

export const clientSchema = z.object({
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.string(),
  age: z.string(),
  gender: z.string(),
  address: z.string(),
  contactNumber: z.string(),
  appointmentDate: z.string(),
  appointmentType: z.string(),
  employersId: z.string(),
  civilStatus: z.string(),
  isPriority: z.string(),
});
export type globalClientData = z.infer<typeof clientSchema>;
export const globalClientSchema = z.array(clientSchema);
