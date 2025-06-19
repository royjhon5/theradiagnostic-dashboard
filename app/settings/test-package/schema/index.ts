import { z } from "zod";

export const PackageItemSchema = z.object({
  itemName: z.string(),
  itemPrice: z.number(),
});

export const LabPackageSchema = z.object({
  packageName: z.string(),
  packageDescription: z.string(),
  startingDate: z.string().datetime(),
  endingDate: z.string().datetime(),
  packages: z.array(PackageItemSchema),
  totalPrice: z.number(),
});

export type globalLabPackageData = z.infer<typeof LabPackageSchema>;
export const globalLabPackageSchema = z.array(LabPackageSchema);
