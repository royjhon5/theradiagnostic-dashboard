import { z } from "zod";

const globalSchema = z.object({
  id: z.number(),
  priority_no: z.number(),
  client_name: z.string(),
  sex: z.string(),
  age: z.string(),
  address: z.string(),
});

export type GlobalData = z.infer<typeof globalSchema>;
export const globalListSchema = z.array(globalSchema);
