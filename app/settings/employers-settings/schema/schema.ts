import { z } from "zod";

export const globalSchema = z.object({
  id: z.number().optional(),
  nameOfEmplyeer: z.string(),
  contactPerson: z.string(),
  phoneNumber: z.string(),
  emailAddress: z.string(),
  establishmentAddress: z.string(),
  industry: z.string(),
});

export type GlobalData = z.infer<typeof globalSchema>;
export const globalListSchema = z.array(globalSchema);

export const updateEmployerSchema = z.object({
  id: z.number(),
  nameOfEmplyeer: z.string(),
  contactPerson: z.string(),
  phoneNumber: z.string(),
  emailAddress: z.string(),
  establishmentAddress: z.string(),
  industry: z.string(),
});

export type GlobalUpdateData = z.infer<typeof updateEmployerSchema>;
export const globalUpateListSchema = z.array(updateEmployerSchema);

export const getEmployeesSchema = z.object({
  id: z.number(),
  employersId: z.number(),
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.string(),
  age: z.string(),
  gender: z.string(),
  currentAddress: z.string(),
  province: z.string(),
  barangay: z.string(),
});

export type GetEmployeesData = z.infer<typeof getEmployeesSchema>;
export const getEmployeesListSchema = z.array(getEmployeesSchema);

export const createEmployeesSchema = z.object({
  employersId: z.number(),
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.string(),
  age: z.string(),
  gender: z.string(),
  currentAddress: z.string(),
  province: z.string(),
  barangay: z.string(),
});

export type CreateEmployeesData = z.infer<typeof createEmployeesSchema>;
export const createEmployeesListSchema = z.array(createEmployeesSchema);

export const updateEmployeesSchema = z.object({
  id: z.number(),
  employersId: z.number(),
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.string(),
  age: z.string(),
  gender: z.string(),
  currentAddress: z.string(),
  province: z.string(),
  barangay: z.string(),
});

export type UpdateEmployeesData = z.infer<typeof updateEmployeesSchema>;
export const updateEmployeesListSchema = z.array(updateEmployeesSchema);

export const getEmployersByIdSchema = z.object({
  employeeId: z.number(),
  employersId: z.string(),
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.string(),
  age: z.string(),
  gender: z.string(),
  currentAddress: z.string(),
  province: z.string(),
  barangay: z.string(),
  nameOfEmployer: z.string(),
  contactPerson: z.string(),
  phoneNumber: z.string(),
  emailAddress: z.string(),
  establishmentAddress: z.string(),
  industry: z.string(),
});

export type getEmployersByIdData = z.infer<typeof getEmployersByIdSchema>;
export const getEmployersByIdListSchema = z.array(getEmployersByIdSchema);
