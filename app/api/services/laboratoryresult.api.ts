import {
  CreateChemistryDTO,
  CreateClinicalMicroscopyDTO,
  CreateHematologyDTO,
  CreateImmunologyDTO,
  GetClientDetailsResultDTO,
  GetIncrementedDTO,
} from "@/types/DTO/Laboratoryresult.dto";
import httpHelper from "../HttpAxios";
import { BaseResponseType } from "@/types/BaseResponse";

const baseAPI = "laboratoryResults";

export const getAllClientResult = async () => {
  const { data: response } = await httpHelper.get<
    BaseResponseType<GetClientDetailsResultDTO[]>
  >(`${baseAPI}/get-client`);
  return response;
};

export const getIncrementedId = async () => {
  const { data: response } = await httpHelper.get<GetIncrementedDTO>(
    `${baseAPI}/incremented-id`
  );
  return response;
};

export const createLaboratoryHemotology = async (
  params: CreateHematologyDTO
) => {
  const { data: response } = await httpHelper.post<BaseResponseType<number>>(
    `${baseAPI}`,
    params
  );
  return response;
};

export const createLaboratoryChemistry = async (params: CreateChemistryDTO) => {
  const { data: response } = await httpHelper.post<BaseResponseType<number>>(
    `${baseAPI}`,
    params
  );
  return response;
};

export const createLaboratoryImmunology = async (
  params: CreateImmunologyDTO
) => {
  const { data: response } = await httpHelper.post<BaseResponseType<number>>(
    `${baseAPI}`,
    params
  );
  return response;
};

export const createClinicalmicroscopy = async (
  params: CreateClinicalMicroscopyDTO
) => {
  const { data: response } = await httpHelper.post<BaseResponseType<number>>(
    `${baseAPI}`,
    params
  );
  return response;
};
