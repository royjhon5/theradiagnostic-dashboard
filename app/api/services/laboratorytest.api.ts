"use client";

import { BaseResponseType } from "@/types/BaseResponse";
import httpHelper from "../HttpAxios";
import {
  CreateLaboratoryTestDto,
  getLaboratoryTestDto,
  updateLabTestDTO,
} from "@/types/DTO/LaboratoryTest.dto";

const baseAPI = "laboratoryTest";

export const getAllLabTest = async () => {
  const { data: response } = await httpHelper.get<
    BaseResponseType<getLaboratoryTestDto[]>
  >(`${baseAPI}/all`);

  return response;
};

export const createLaboratoryTest = async (params: CreateLaboratoryTestDto) => {
  const { data: response } = await httpHelper.post<BaseResponseType<number>>(
    `${baseAPI}`,
    params
  );
  return response;
};

export const updateLabTest = async (params: updateLabTestDTO) => {
  const { id, ...body } = params;
  const { data: response } = await httpHelper.patch<BaseResponseType<boolean>>(
    `${baseAPI}/${id}`,
    body
  );
  return response;
};

export const deleteTest = async (id: number) => {
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
