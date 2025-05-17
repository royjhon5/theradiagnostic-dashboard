import { z } from "zod";

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});
export const globalLoginSchema = z.array(loginSchema);
export type globalLoginSchema = z.infer<typeof loginSchema>;
