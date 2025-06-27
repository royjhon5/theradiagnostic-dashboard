import { z } from "zod";

export const userScheme = z.object({
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
