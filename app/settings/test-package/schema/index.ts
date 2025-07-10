import { z } from "zod";

export const PackageItemSchema = z.object({
  itemName: z.string(),
  itemPrice: z.number(),
});

export const LabPackageSchema = z.object({
  id: z.number().optional(),
  packageName: z.string(),
  packages: z.array(PackageItemSchema),
  totalPrice: z.number(),
});

export type globalLabPackageData = z.infer<typeof LabPackageSchema>;
export const globalLabPackageSchema = z.array(LabPackageSchema);

export const UpdatePackageItemSchema = z.object({
  itemName: z.string(),
  itemPrice: z.number(),
});

export const UpdateLabPackageSchema = z.object({
  id: z.number(),
  packageName: z.string(),
  packages: z.array(UpdatePackageItemSchema),
  totalPrice: z.coerce.number(),
});

export type globalUpdateLabPackageData = z.infer<typeof UpdateLabPackageSchema>;
export const globalUpdateLabPackageSchema = z.array(UpdateLabPackageSchema);
