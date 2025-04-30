import { z } from "zod";

export const GlobalSchema = z.object({
  client_id: z.number(),
  client_name: z.string(),
  transaction_date: z.string(),
  amount_in_php: z.number(),
  status: z.string(),
});

export type GlobalData = z.infer<typeof GlobalSchema>;
