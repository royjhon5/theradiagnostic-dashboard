export type CreateCartDTO = {
  clientId: number;
  packageId: number;
  labTestId: number;
  totalAmount: number;
};

export interface GetCartDTO {
  id: number;
  clientId: number;
  packageId: number;
  labTestId: number;
  totalAmount: number;
  testName: string;
  testCategory: string;
  price: number;
  packageName: string;
  packageDescription: string;
  packages: Package[];
  totalPrice: number;
}

export interface Package {
  itemName: string;
  itemPrice: number;
}
