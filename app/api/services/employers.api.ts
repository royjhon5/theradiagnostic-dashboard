"use client";

import { BaseResponseType } from "@/types/BaseResponse";
import httpHelper from "../HttpAxios";
import {
  CreateEmployersDTO,
  EmployeeWithEmployerDTO,
  EmployersDTO,
  UpdateEmployersDTO,
} from "@/types/DTO/Employers.dto";

const baseAPI = "employer";

export const getAllEmployers = async () => {
  const { data: response } = await httpHelper.get<
    BaseResponseType<EmployersDTO[]>
  >(`${baseAPI}/all`);

  return response;
};

export const createEmployer = async (params: CreateEmployersDTO) => {
  const { data: response } = await httpHelper.post<BaseResponseType<number>>(
    `${baseAPI}`,
    params
  );

  return response;
};

export const updateEmployer = async (params: UpdateEmployersDTO) => {
  const { id, ...body } = params;

  const { data: response } = await httpHelper.patch<BaseResponseType<boolean>>(
    `${baseAPI}/${id}`,
    body
  );

  return response;
};

export const getEmployersById = async (id: number) => {
  try {
    const { data: response } = await httpHelper.get<
      BaseResponseType<EmployeeWithEmployerDTO[]>
    >(`${baseAPI}/${id}`);
    return response;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export const deleteEmployer = async (id: number) => {
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
