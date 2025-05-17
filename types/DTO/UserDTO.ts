export type UserSignInDto = {
  username: string;
  password: string;
};

export type UserSignUpDto = {
  email: string;
  userName: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  roleId: string;
  phoneNumber: string;
  address: string;
  canPerformUserManagment: number;
  canPerformClientAppointments: number;
  canViewReports: number;
  canAddLaboratoryPackages: number;
  canPerformLaboratoryRequest: number;
  additonalNotes: string;
};

export type LoginResponseDto = {
  userId: string;
  token: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  phoneNumber: string;
};

export type CurrentUserDto = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  twoFactorEnabled: boolean;
  roles: string[];
  address: string;
  canPerformUserManagment: number;
  canPerformClientAppointments: number;
  canViewReports: number;
  canAddLaboratoryPackages: number;
  canPerformLaboratoryRequest: number;
  additonalNotes: string;
};

export type UserRolesDto = {
  id: string;
  name: string;
};
