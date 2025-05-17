export type CreateLaboratoryTestDto = {
  testName: string;
  testCategory: string;
  price: string;
  description: string;
  additionalNotes: string;
};

export type getLaboratoryTestDto = {
  id: number;
  testName: string;
  testCategory: string;
  price: string;
  description: string;
  additionalNotes: string;
};
