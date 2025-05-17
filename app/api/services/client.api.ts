"use client";

import { BaseResponseType } from "@/types/BaseResponse";
import httpHelper from "../HttpAxios";
import {
  ClientDto,
  CreateClientDto,
  GetClientDTO,
  UpdateClientDto,
} from "@/types/DTO/Client.dto";

const baseAPI = "client";

export const getAllClient = async () => {
  const { data: response } = await httpHelper.get<
    BaseResponseType<ClientDto[]>
  >(`${baseAPI}/all`);

  return response;
};

export const createClient = async (params: CreateClientDto) => {
  const { data: response } = await httpHelper.post<BaseResponseType<number>>(
    `${baseAPI}`,
    params
  );

  return response;
};

export const updateClient = async (params: UpdateClientDto) => {
  const { data: response } = await httpHelper.patch<BaseResponseType<boolean>>(
    `${baseAPI}`,
    params
  );

  return response;
};

export const deleteClient = async (clientId: number) => {
  const { data: response } = await httpHelper.delete<BaseResponseType<boolean>>(
    `${baseAPI}?clientId=${clientId}`
  );

  return response;
};

export const getClientById = async (clientId: string) => {
  try {
    const { data: response } = await httpHelper.get<
      BaseResponseType<GetClientDTO>
    >(`${baseAPI}/${clientId}`);
    return response;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};
