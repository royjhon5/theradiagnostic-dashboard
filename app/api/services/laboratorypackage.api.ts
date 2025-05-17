"use client";

import {
  CreatePackageDto,
  getLaboratoryPackageDto,
} from "@/types/DTO/LaboratoryPackage.dto";
import httpHelper from "../HttpAxios";
import { BaseResponseType } from "@/types/BaseResponse";

const baseAPI = "laboratoryPackage";

export const getAllLabPackage = async () => {
  const { data: response } = await httpHelper.get<
    BaseResponseType<getLaboratoryPackageDto[]>
  >(`${baseAPI}/all`);

  return response;
};

export const createLaboratoryPackage = async (params: CreatePackageDto) => {
  const { data: response } = await httpHelper.post<BaseResponseType<number>>(
    `${baseAPI}`,
    params
  );
  return response;
};
