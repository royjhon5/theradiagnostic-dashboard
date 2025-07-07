import { z } from "zod";

export const clientSchema = z.object({
  id: z.number().optional(),
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.string(),
  age: z.string(),
  gender: z.string(),
  address: z.string(),
  contactNumber: z.string(),
  emailAddress: z.string(),
  isFag: z.string(),
  appointmentDate: z.string(),
  appointmentType: z.string(),
  employersId: z.string(),
  civilStatus: z.string(),
  isPriority: z.string(),
});
export type globalClientData = z.infer<typeof clientSchema>;
export const globalClientSchema = z.array(clientSchema);

export const getClientSchema = z.object({
  id: z.number().optional(),
  firstName: z.string().nullable(),
  middleName: z.string().nullable(),
  lastName: z.string().nullable(),
  dateOfBirth: z.string().nullable(),
  age: z.string().nullable(),
  gender: z.string().nullable(),
  address: z.string().nullable(),
  contactNumber: z.string().nullable(),
  emailAddress: z.string().nullable(),
  isFag: z.string().nullable(),
  appointmentDate: z.string().nullable(),
  appointmentType: z.string().nullable(),
  civilStatus: z.string().nullable(),
  isPriority: z.string().nullable(),
});

export type globalGetClientData = z.infer<typeof getClientSchema>;
export const globalGetClientSchema = z.array(getClientSchema);

export const updateClientSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.string(),
  age: z.string(),
  gender: z.string(),
  address: z.string(),
  contactNumber: z.string(),
  civilStatus: z.string(),
  isPriority: z.string(),
});

export type globalUpdateClientData = z.infer<typeof updateClientSchema>;
export const globalUpdateClientSchema = z.array(updateClientSchema);
