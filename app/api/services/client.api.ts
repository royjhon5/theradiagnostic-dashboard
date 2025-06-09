"use client";

import { BaseResponseType } from "@/types/BaseResponse";
import httpHelper from "../HttpAxios";
import {
  ClientDto,
  CreateClientDto,
  GetClientDTO,
  GetOnQueDTO,
  GetReferralCodeDTO,
  UpdateClientDto,
} from "@/types/DTO/Client.dto";

const baseAPI = "client";

export const getAllClient = async () => {
  const { data: response } = await httpHelper.get<
    BaseResponseType<ClientDto[]>
  >(`${baseAPI}/all`);

  return response;
};

export const getOnQue = async () => {
  const { data: response } = await httpHelper.get<
    BaseResponseType<GetOnQueDTO[]>
  >(`${baseAPI}/on-que`);

  return response;
};

export const getNowServing = async () => {
  const { data: response } = await httpHelper.get<
    BaseResponseType<GetOnQueDTO[]>
  >(`${baseAPI}/now-serving`);

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

export const NowServingInSyncRegular = async () => {
  const { data: response } = await httpHelper.post<BaseResponseType<boolean>>(
    `${baseAPI}/now-serving-sync`
  );
  return response;
};

export const NowServingInSyncPrio = async () => {
  const { data: response } = await httpHelper.post<BaseResponseType<boolean>>(
    `${baseAPI}/now-serving-prio-sync`
  );
  return response;
};

export const deleteClient = async (clientId: number) => {
  const { data: response } = await httpHelper.delete<BaseResponseType<boolean>>(
    `${baseAPI}?clientId=${clientId}`
  );

  return response;
};

export const getClientById = async (id: number) => {
  try {
    const { data: response } = await httpHelper.get<
      BaseResponseType<GetClientDTO[]>
    >(`${baseAPI}/${id}`);
    return response;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export const getReferralCode = async (code: string) => {
  try {
    const { data: response } = await httpHelper.get<
      BaseResponseType<GetReferralCodeDTO[]>
    >(`${baseAPI}/verify?code=${code}`);
    return response;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export const generateMedicalReportPdf = async (
  id: number,
  UserId: string,
  packageId: number
) => {
  const response = await httpHelper.get<Blob>(
    `${baseAPI}/generate-medical-report/${id}?UserId=${UserId}&packageId=${packageId}`,
    {
      responseType: "blob",
    }
  );

  const pdfBlob = new Blob([response.data], { type: "application/pdf" });
  const url = URL.createObjectURL(pdfBlob);
  window.open(url, "_blank");
};
