export type CreateTransactionDTO = {
  clientId: number;
  packageId: number;
  amountPaid: string;
  paymentType: string;
  paymentReference: string;
};
