import { z } from "zod";

export const clientSchema = z.object({
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.string(),
  age: z.string(),
  gender: z.string(),
  currentAddress: z.string(),
  province: z.string(),
  barangay: z.string(),
  seniorCitizen: z.string(),
  validId: z.string(),
  validIdNo: z.string(),
  activePhoneNumber: z.string(),
  activeEmail: z.string(),
  medicalHistory: z.string(),
  currentMedication: z.string(),
  knownAllergies: z.string(),
  insuranceInfo: z.string(),
  appointmentDate: z.string(),
  appointmentType: z.string(),
});
export type globalClientData = z.infer<typeof clientSchema>;
export const globalClientSchema = z.array(clientSchema);
