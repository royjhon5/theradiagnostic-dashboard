export type CreateEmployersDTO = {
  nameOfEmplyeer: string;
  contactPerson: string;
  phoneNumber: string;
  emailAddress: string;
  establishmentAddress: string;
  industry: string;
};

export type UpdateEmployersDTO = {
  id: number;
  nameOfEmplyeer: string;
  contactPerson: string;
  phoneNumber: string;
  emailAddress: string;
  establishmentAddress: string;
  industry: string;
};

export type EmployersDTO = {
  id: number;
  nameOfEmplyeer: string;
  contactPerson: string;
  phoneNumber: string;
  emailAddress: string;
  establishmentAddress: string;
  industry: string;
};

export type GetEmployersDTO = {
  id: number;
  nameOfEmplyeer: string;
  contactPerson: string;
  phoneNumber: string;
  emailAddress: string;
  establishmentAddress: string;
  industry: string;
};

export type EmployeeWithEmployerDTO = {
  employeeId: number;
  employersId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  age: string;
  gender: string;
  currentAddress: string;
  province: string;
  barangay: string;
  nameOfEmployer: string;
  contactPerson: string;
  phoneNumber: string;
  emailAddress: string;
  establishmentAddress: string;
  industry: string;
};
