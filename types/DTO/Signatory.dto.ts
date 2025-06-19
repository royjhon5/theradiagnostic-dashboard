export type CreateSignatoryDTO = {
  signatoryName: string;
  signatoryPosition: string;
  signatureImage: string;
  licenseNumber: string;
};

export type GetSignatoryDTO = {
  id: number;
  signatoryName: string;
  signatoryPosition: string;
  signatureImage: string;
  licenseNumber: string;
};

export type UpdateSignatoryDTO = {
  id: number;
  signatoryName: string;
  signatoryPosition: string;
  signatureImage: string;
  licenseNumber: string;
};
