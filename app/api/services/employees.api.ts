"use client";

import { BaseResponseType } from "@/types/BaseResponse";
import httpHelper from "../HttpAxios";
import {
  CreateEmployeesDTO,
  GetEmployeesDTO,
  UpdateEmployeesDTO,
} from "@/types/DTO/Employees.dto";

const baseAPI = "employees";

export const getAllEmployees = async () => {
  const { data: response } = await httpHelper.get<
    BaseResponseType<GetEmployeesDTO[]>
  >(`${baseAPI}/all`);

  return response;
};

export const createEmployees = async (params: CreateEmployeesDTO) => {
  const { data: response } = await httpHelper.post<BaseResponseType<number>>(
    `${baseAPI}`,
    params
  );

  return response;
};

export const updateEmployees = async (params: UpdateEmployeesDTO) => {
  const { id, ...body } = params;
  const { data: response } = await httpHelper.patch<BaseResponseType<boolean>>(
    `${baseAPI}/${id}`,
    body
  );

  return response;
};

export const deleteEmployees = async (id: number) => {
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
