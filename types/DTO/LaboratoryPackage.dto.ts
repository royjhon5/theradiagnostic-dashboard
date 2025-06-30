export type PackageItemDto = {
  itemName: string;
  itemPrice: number;
};

export type CreatePackageDto = {
  packageName: string;
  packages: PackageItemDto[];
  totalPrice: number;
};

export type getLaboratoryPackageDto = {
  id: number;
  packageName: string;
  packages: PackageItemDto[];
  totalPrice: number;
};

export type UpdatePackageItemDto = {
  itemName: string;
  itemPrice: number;
};

export type UpdatePackageDto = {
  id: number;
  packageName: string;
  packages: PackageItemDto[];
  totalPrice: number;
};
