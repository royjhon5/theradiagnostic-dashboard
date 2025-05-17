"use client";

import { BaseResponseType } from "@/types/BaseResponse";
import httpHelper from "../HttpAxios";
import {
  CreateLaboratoryTestDto,
  getLaboratoryTestDto,
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
