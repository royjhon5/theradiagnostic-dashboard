export type CreateDiscountDto = {
  discountDescription: string;
  discountAmount: number;
};

export type UpdateDiscountDto = {
  id: number;
  discountDescription: string;
  discountAmount: number;
};

export type GetDiscountDto = {
  id: number;
  discountDescription: string;
  discountAmount: number;
};

export type ApplyDiscountDto = {
  clientId: number;
  discountId: number;
  applyDiscount: boolean;
};
