import { z } from "zod";

export const clientSchema = z.object({
  firstName: z.string().nullable(),
  middleName: z.string().nullable(),
  lastName: z.string().nullable(),
  dateOfBirth: z.string().nullable(),
  age: z.string().nullable(),
  gender: z.string().nullable(),
  address: z.string().nullable(),
  contactNumber: z.string().nullable(),
  appointmentDate: z.string().nullable(),
  appointmentType: z.string().nullable(),
  civilStatus: z.string().nullable(),
  isPriority: z.string().nullable(),
});
export type globalClientData = z.infer<typeof clientSchema>;
export const globalClientSchema = z.array(clientSchema);
