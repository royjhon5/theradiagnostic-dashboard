export type PackageItemDto = {
  itemName: string;
  itemPrice: number;
};

export type CreatePackageDto = {
  packageName: string;
  packageDescription: string;
  startingDate: string;
  endingDate: string;
  packages: PackageItemDto[];
  totalPrice: number;
  packageType: string;
  packageDiscountAmount: number;
  individualDiscountAmount: number;
};

export type getLaboratoryPackageDto = {
  id: number;
  packageName: string;
  packageDescription: string;
  startingDate: string;
  endingDate: string;
  packages: PackageItemDto[];
  totalPrice: number;
};
