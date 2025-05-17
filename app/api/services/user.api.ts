import { BaseResponseType } from "@/types/BaseResponse";
import httpHelper from "../HttpAxios";
import {
  CurrentUserDto,
  LoginResponseDto,
  UserSignInDto,
  UserSignUpDto,
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

export const getUserRoles = async () => {
  const { data: response } = await httpHelper.get(`${baseAPI}/user-roles`);
  return response;
};
