"use client";

import { BaseResponseType } from "@/types/BaseResponse";
import httpHelper from "../HttpAxios";
import {
  CreateSignatoryDTO,
  GetSignatoryDTO,
  UpdateSignatoryDTO,
} from "@/types/DTO/Signatory.dto";

const baseAPI = "signatory";

export const getAllSignatory = async () => {
  const { data: response } = await httpHelper.get<
    BaseResponseType<GetSignatoryDTO[]>
  >(`${baseAPI}/all`);

  return response;
};

export const createSignatory = async (params: CreateSignatoryDTO) => {
  const { data: response } = await httpHelper.post<BaseResponseType<number>>(
    `${baseAPI}`,
    params
  );
  return response;
};

export const updateSignatory = async (params: UpdateSignatoryDTO) => {
  const { id, ...body } = params;
  const { data: response } = await httpHelper.patch<BaseResponseType<boolean>>(
    `${baseAPI}/${id}`,
    body
  );

  return response;
};

export const deleteSignatory = async (id: number) => {
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
