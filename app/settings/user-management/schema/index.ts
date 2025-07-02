import { z } from "zod";

export const userScheme = z.object({
  id: z.string().optional(),
  email: z.string(),
  userName: z.string(),
  passwordHash: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    }),
  firstName: z.string(),
  middleInitial: z.string(),
  lastName: z.string(),
  professionalTitle: z.string(),
  roleId: z.string(),
  phoneNumber: z.string(),
  address: z.string(),
  licenseNumber: z.string(),
  signature: z.string(),
});
export type globalUserData = z.infer<typeof userScheme>;
export const globalUserSchema = z.array(userScheme);

export const updateUserSchema = z.object({
  id: z.string(),
  userName: z.string(),
  email: z.string(),
  firstName: z.string(),
  middleInitial: z.string(),
  lastName: z.string(),
  professionalTitle: z.string(),
  roleId: z.string(),
  phoneNumber: z.string(),
  address: z.string(),
  licenseNumber: z.string(),
  signature: z.string(),
});
export type globalUpdateUserData = z.infer<typeof updateUserSchema>;
export const globalUserUpdateSchema = z.array(updateUserSchema);

export const getUsersSchema = z.object({
  id: z.string().nullable(),
  email: z.string().nullable(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  userName: z.string().nullable(),
  professionalTitle: z.string().nullable(),
  roleId: z.string().nullable(),
  roles: z.array(z.string()).nullable(),
  phoneNumber: z.string().nullable(),
  address: z.string().nullable(),
  licenseNumber: z.string().nullable(),
});
export type globalGetUsersData = z.infer<typeof getUsersSchema>;
export const globalGetUsersSchema = z.array(getUsersSchema);
