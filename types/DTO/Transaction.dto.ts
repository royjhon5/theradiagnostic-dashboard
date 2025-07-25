export type CreateTransactionDTO = {
  clientId: number;
  amountPaid: string;
  paymentType: string;
  paymentReference: string;
  totalAmount: number;
  remarks: string;
};
