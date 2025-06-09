import { CreateTransactionDTO } from "@/types/DTO/Transaction.dto";
import httpHelper from "../HttpAxios";
import { BaseResponseType } from "@/types/BaseResponse";

const baseAPI = "transactions";

export const createTransaction = async (params: CreateTransactionDTO) => {
  const { data: response } = await httpHelper.post<BaseResponseType<number>>(
    `${baseAPI}`,
    params
  );
  return response;
};
