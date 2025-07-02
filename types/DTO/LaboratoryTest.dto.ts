export type CreateLaboratoryTestDto = {
  testName: string;
  testCategory: string;
  price: number;
};

export type getLaboratoryTestDto = {
  id: number;
  testName: string;
  testCategory: string;
  price: number;
};

export type updateLabTestDTO = {
  id: number;
  testName: string;
  testCategory: string;
  price: number;
};
