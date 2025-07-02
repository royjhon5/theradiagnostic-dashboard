export type UserSignInDto = {
  username: string;
  password: string;
};

export type UserSignUpDto = {
  email: string;
  userName: string;
  passwordHash: string;
  firstName: string;
  middleInitial: string;
  lastName: string;
  professionalTitle: string;
  roleId: string;
  phoneNumber: string;
  address: string;
  licenseNumber: string;
  signature: string;
};

export type UserUpdateDto = {
  id: string;
  userName: string;
  email: string;
  firstName: string;
  middleInitial: string;
  lastName: string;
  professionalTitle: string;
  roleId: string;
  phoneNumber: string;
  address: string;
  licenseNumber: string;
  signature: string;
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
  licenseNumber: string;
  signature: string;
};

export type UserRolesDto = {
  id: string;
  name: string;
};

export type GetUserDto = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  professionalTitle: string;
  roleId: string;
  roles: string[];
  phoneNumber: string;
  address: string;
  licenseNumber: string;
};
