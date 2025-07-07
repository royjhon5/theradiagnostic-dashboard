"use client";

import { BaseResponseType } from "@/types/BaseResponse";
import httpHelper from "../HttpAxios";
import {
  ApplyDiscountDto,
  CreateDiscountDto,
  GetDiscountDto,
  UpdateDiscountDto,
} from "@/types/DTO/Discount..dto";

const baseAPI = "Discount";

export const getAllDiscount = async () => {
  const { data: response } = await httpHelper.get<
    BaseResponseType<GetDiscountDto[]>
  >(`${baseAPI}/all`);

  return response;
};

export const createDiscount = async (params: CreateDiscountDto) => {
  const { data: response } = await httpHelper.post<BaseResponseType<number>>(
    `${baseAPI}`,
    params
  );
  return response;
};

export const updateDiscount = async (params: UpdateDiscountDto) => {
  const { id, ...body } = params;
  const { data: response } = await httpHelper.patch<BaseResponseType<boolean>>(
    `${baseAPI}/${id}`,
    body
  );
  return response;
};

export const applyDiscount = async (params: ApplyDiscountDto) => {
  const { ...body } = params;
  const { data: response } = await httpHelper.patch<BaseResponseType<boolean>>(
    `${baseAPI}/apply`,
    body
  );
  return response;
};

export const deleteDiscount = async (id: number) => {
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
