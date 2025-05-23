export type CreateEmployeesDTO = {
  employersId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  age: string;
  gender: string;
  currentAddress: string;
  province: string;
  barangay: string;
};

export type UpdateEmployeesDTO = {
  id: number;
  employersId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  age: string;
  gender: string;
  currentAddress: string;
  province: string;
  barangay: string;
};

export type GetEmployeesDTO = {
  id: number;
  employersId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  age: string;
  gender: string;
  currentAddress: string;
  province: string;
  barangay: string;
};
