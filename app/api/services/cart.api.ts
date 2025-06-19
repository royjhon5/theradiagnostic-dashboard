import httpHelper from "../HttpAxios";
import { BaseResponseType } from "@/types/BaseResponse";
import { CreateCartDTO, GetCartDTO } from "@/types/DTO/Cart.dto";

const baseAPI = "cart";

export const addToCart = async (params: CreateCartDTO) => {
  const { data: response } = await httpHelper.post<BaseResponseType<number>>(
    `${baseAPI}`,
    params
  );
  return response;
};

export const getCart = async (id: number) => {
  try {
    const { data: response } = await httpHelper.get<
      BaseResponseType<GetCartDTO[]>
    >(`${baseAPI}/${id}`);
    return response;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export const removeCart = async (id: number) => {
  try {
    const { data: response } = await httpHelper.delete<
      BaseResponseType<boolean>
    >(`${baseAPI}/remove-cart/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error as BaseResponseType<string>;
  }
};
