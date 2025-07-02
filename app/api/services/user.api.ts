import { BaseResponseType } from "@/types/BaseResponse";
import httpHelper from "../HttpAxios";
import {
  CurrentUserDto,
  GetUserDto,
  LoginResponseDto,
  UserSignInDto,
  UserSignUpDto,
  UserUpdateDto,
} from "@/types/DTO/UserDTO";

const baseAPI = "account";

export const userSignIn = async (params: UserSignInDto) => {
  const { data: response } = await httpHelper.post<
    BaseResponseType<LoginResponseDto>
  >(`${baseAPI}/login`, { ...params });
  return response;
};

export const userSignUp = async (params: UserSignUpDto) => {
  const { data: response } = await httpHelper.post<BaseResponseType<string[]>>(
    `${baseAPI}/register`,
    {
      ...params,
    }
  );
  return response;
};

export const updateUser = async (params: UserUpdateDto) => {
  const { ...body } = params;
  const { data: response } = await httpHelper.patch<BaseResponseType<boolean>>(
    `${baseAPI}/update`,
    body
  );
  return response;
};

export const getCurrentUser = async () => {
  try {
    const { data: response } = await httpHelper.get<
      BaseResponseType<CurrentUserDto>
    >(`${baseAPI}/current-user`);
    return response;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
};

export const getAllUsers = async () => {
  const { data: response } = await httpHelper.get<
    BaseResponseType<GetUserDto[]>
  >(`${baseAPI}/all`);
  return response;
};

export const getUserRoles = async () => {
  const { data: response } = await httpHelper.get(`${baseAPI}/user-roles`);
  return response;
};

export const deleteUser = async (id: string) => {
  try {
    const { data: response } = await httpHelper.delete<
      BaseResponseType<boolean>
    >(`${baseAPI}/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error as BaseResponseType<string>;
  }
};
