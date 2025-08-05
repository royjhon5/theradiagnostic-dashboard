"use client";

import { BaseResponseType } from "@/types/BaseResponse";
import httpHelper from "../HttpAxios";
import { CountAmountDTO, CountDTO } from "@/types/DTO/Dashboard.dto";

const baseAPI = "Dashboard";

export const getAllEmployeesTotal = async () => {
  const { data: response } = await httpHelper.get<BaseResponseType<CountDTO[]>>(
    `${baseAPI}/all-employees`
  );
  return response;
};

export const getTotalSales = async () => {
  const { data: response } = await httpHelper.get<
    BaseResponseType<CountAmountDTO[]>
  >(`${baseAPI}/total-sales`);

  return response;
};

export const getAllClientTotal = async () => {
  const { data: response } = await httpHelper.get<BaseResponseType<CountDTO[]>>(
    `${baseAPI}/all-client`
  );

  return response;
};
