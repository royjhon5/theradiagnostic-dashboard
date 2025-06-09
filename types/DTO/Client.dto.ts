export type CreateClientDto = {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  age: string;
  gender: string;
  currentAddress: string;
  // province: string;
  // barangay: string;
  // seniorCitizen: string;
  // validId: string;
  // validIdNo: string;
  activePhoneNumber: string;
  // activeEmail: string;
  // medicalHistory: string;
  // currentMedication: string;
  // knownAllergies: string;
  // insuranceInfo: string;
  appointmentDate: string;
  appointmentType: string;
  employersId: string;
  civilStatus: string;
  clientType: string;
};

export type UpdateClientDto = CreateClientDto & {
  id: number;
};

export type ClientDto = {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  age: string;
  gender: string;
  currentAddress: string;
  province: string;
  barangay: string;
  seniorCitizen: string;
  validId: string;
  validIdNo: string;
  activePhoneNumber: string;
  activeEmail: string;
  medicalHistory: string;
  currentMedication: string;
  knownAllergies: string;
  insuranceInfo: string;
  appointmentDate: string;
  appointmentType: string;
};

export type GetClientDTO = {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  age: string;
  gender: string;
  currentAddress: string;
  province: string;
  barangay: string;
  seniorCitizen: string;
  validId: string;
  validIdNo: string;
  activePhoneNumber: string;
  activeEmail: string;
  medicalHistory: string;
  currentMedication: string;
  knownAllergies: string;
  insuranceInfo: string;
  priorityNo: string;
  qrCodeImage: Uint8Array | ArrayBuffer;
};

export type GetReferralCodeDTO = {
  id: number;
  referralCode: string;
  message: string;
};

export type GetOnQueDTO = {
  id: number;
  priorityNo: string;
  status: string;
  clientType: string;
};
