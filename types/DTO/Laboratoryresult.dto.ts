export type CreateHematologyDTO = {
  userId: string;
  clientId: number;
  hematology: Hematology;
};

export type CreateChemistryDTO = {
  userId: string;
  clientId: number;
  chemistry: Chemistry;
};

export type CreateClinicalMicroscopyDTO = {
  userId: string;
  clientId: number;
  clinicalmicroscopy: ClinicalMicroscopy;
};

export type CreateImmunologyDTO = {
  userId: string;
  clientId: number;
  immunology: Immunology;
};

export type Chemistry = {
  fastingBloodSugarResult: string;
  fastingBloodSugarUnit: string;
  fastingBloodSugarRange: string;
  twoHPPBloodSugarResult: string;
  twoHPPBloodSugarUnit: string;
  twoHPPBloodSugarRange: string;
  creatinineResult: string;
  creatinineUnit: string;
  creatinineRange: string;
  eGFRCKDEPIResult: string;
  eGFRCKDEPIUnit: string;
  eGFRCKDEPIRange: string;
  sgptaltResult: string;
  sgptaltUnit: string;
  sgptaltRange: string;
  cholesterolResult: string;
  cholesterolUnit: string;
  cholesterolRange: string;
  triglyceridesResult: string;
  triglyceridesUnit: string;
  triglyceridesRange: string;
  hdlResult: string;
  hdlUnit: string;
  hdlRange: string;
  ldlResult: string;
  ldlUnit: string;
  ldlRange: string;
  vldlResult: string;
  vldlUnit: string;
  vldlRange: string;
  cholhdlRatioResult: string;
  cholhdlRatioUnit: string;
  cholhdlRatioRange: string;
};

export type ClinicalMicroscopy = {
  micralResult: string;
  micralUnit: string;
  micralRange: string;
  urineColorResult: string;
  urineColorUnit: string;
  urineColorRange: string;
  urineTransparencyResult: string;
  urineTransparencyUnit: string;
  urineTransparencyRange: string;
  spGravityResult: string;
  spGravityUnit: string;
  spGravityRange: string;
  pHResult: string;
  pHUnit: string;
  pHRange: string;
  proteinResult: string;
  proteinUnit: string;
  proteinRange: string;
  glucoseResult: string;
  glucoseUnit: string;
  glucoseRange: string;
  bilirubinResult: string;
  bilirubinUnit: string;
  bilirubinRange: string;
  bloodResult: string;
  bloodUnit: string;
  bloodRange: string;
  leucocytesResult: string;
  leucocytesUnit: string;
  lucocytesRange: string;
  nitriteResult: string;
  nitriteUnit: string;
  nitriteRange: string;
  urobilinogenResult: string;
  urobilinogenUnit: string;
  urobilinogenRange: string;
  ketoneResult: string;
  ketoneUnit: string;
  ketoneRange: string;
  rbcResult: string;
  rbcUnit: string;
  rbcRange: string;
  wbcResult: string;
  wbcUnit: string;
  wbcRange: string;
  epithelialResult: string;
  epithelialUnit: string;
  epithelialRange: string;
  bacteriaResult: string;
  bacteriaUnit: string;
  bacteriaRange: string;
  mucusThreadResult: string;
  mucusThreadUnit: string;
  mucusThreadRange: string;
  hyalineCastResult: string;
  hyalineCastUnit: string;
  hyalineCastRange: string;
};

export type Hematology = {
  whiteBloodCellsResults: string;
  whiteBloodUnit: string;
  whiteBloodRange: string;
  redBloodCellsResults: string;
  redBloodUnit: string;
  redBloodRange: string;
  hemoglobinResults: string;
  hemoglobinUnit: string;
  hemoglobinRange: string;
  hematocritResult: string;
  hematocritUnit: string;
  hematocritRange: string;
  meanCorpuscularVolumeResult: string;
  meanCorpuscularVolumeUnit: string;
  meanCorpuscularVolumeRange: string;
  meanCorpuscularHbResult: string;
  meanCorpuscularHbUnit: string;
  meanCorpuscularHbRange: string;
  meanCorpuscularHbConcResult: string;
  meanCorpuscularHbConcUnit: string;
  meanCorpuscularHbConcRange: string;
  rbcDistributionWidthResult: string;
  rbcDistributionWidthUnit: string;
  rbcDistributionWidthRange: string;
  plateletCountResult: string;
  plateletCountUnit: string;
  plateletCountRange: string;
  segmentersNeutrophilsResult: string;
  segmentersNeutrophilsUnit: string;
  segmentersNeutrophilsRange: string;
  lymphocytesResult: string;
  lymphocytesUnit: string;
  lymphocytesRange: string;
  monocytesResult: string;
  monocytesUnit: string;
  monocytesRange: string;
  eosinophlisResult: string;
  eosinophlisUnit: string;
  eosinophlisRange: string;
  basophilsResult: string;
  basophilsUnit: string;
  basophilsRange: string;
  bandsResult: string;
  bandsUnit: string;
  bandsRange: string;
  absoluteSegNeutroCountResult: string;
  absoluteSegNeutroCountUnit: string;
  absoluteSegNeutroCountRange: string;
  absoluteLymphocyteCountResult: string;
  absoluteLymphocyteCountUnit: string;
  absoluteLymphocyteCountRange: string;
  absoluteMonocyteCountResult: string;
  absoluteMonocyteCountUnit: string;
  absoluteMonocyteCountRange: string;
  absoluteEosinophilCountResult: string;
  absoluteEosinophilCountUnit: string;
  absoluteEosinophilCountRange: string;
  absoluteBasophilCountResult: string;
  absoluteBasophilCountUnit: string;
  absoluteBasophilCountRange: string;
  absoluteBandCountResult: string;
  absoluteBandCountUnit: string;
  absoluteBandCountRange: string;
};

export type Immunology = {
  tshResult: string;
  tshUnit: string;
  tshRange: string;
  ftFourResult: string;
  ftFourUnit: string;
  ftFourRange: string;
};

export type GetIncrementedDTO = {
  latestId: number;
};

export const ImmunologyDefault = {
  tshResult: "string",
  tshUnit: "string",
  tshRange: "string",
  ftFourResult: "string",
  ftFourUnit: "string",
  ftFourRange: "string",
};

export const ChemistryDefault = {
  fastingBloodSugarResult: "string",
  fastingBloodSugarUnit: "string",
  fastingBloodSugarRange: "string",
  twoHPPBloodSugarResult: "string",
  twoHPPBloodSugarUnit: "string",
  twoHPPBloodSugarRange: "string",
  eGFRCKDEPIResult: "string",
  eGFRCKDEPIUnit: "string",
  eGFRCKDEPIRange: "string",
  sgptaltResult: "string",
  sgptaltUnit: "string",
  sgptaltRange: "string",
  cholesterolResult: "string",
  cholesterolUnit: "string",
  cholesterolRange: "string",
  triglyceridesResult: "string",
  triglyceridesUnit: "string",
  triglyceridesRange: "string",
  hdlResult: "string",
  hdlUnit: "string",
  hdlRange: "string",
  ldlResult: "string",
  ldlUnit: "string",
  ldlRange: "string",
  vldlResult: "string",
  vldlUnit: "string",
  vldlRange: "string",
  cholhdlRatioResult: "string",
  cholhdlRatioUnit: "string",
  cholhdlRatioRange: "string",
};

export const ClinicalMicroscopyDefault = {
  micralResult: "string",
  micralUnit: "string",
  micralRange: "string",
  urineColorResult: "string",
  urineColorUnit: "string",
  urineColorRange: "string",
  urineTransparencyResult: "string",
  urineTransparencyUnit: "string",
  urineTransparencyRange: "string",
  spGravityResult: "string",
  spGravityUnit: "string",
  spGravityRange: "string",
  pHResult: "string",
  pHUnit: "string",
  pHRange: "string",
  proteinResult: "string",
  proteinUnit: "string",
  proteinRange: "string",
  glucoseResult: "string",
  glucoseUnit: "string",
  glucoseRange: "string",
  bilirubinResult: "string",
  bilirubinUnit: "string",
  bilirubinRange: "string",
  bloodResult: "string",
  bloodUnit: "string",
  bloodRange: "string",
  leucocytesResult: "string",
  leucocytesUnit: "string",
  lucocytesRange: "string",
  nitriteResult: "string",
  nitriteUnit: "string",
  nitriteRange: "string",
  urobilinogenResult: "string",
  urobilinogenUnit: "string",
  urobilinogenRange: "string",
  ketoneResult: "string",
  ketoneUnit: "string",
  ketoneRange: "string",
  rbcResult: "string",
  rbcUnit: "string",
  rbcRange: "string",
  wbcResult: "string",
  wbcUnit: "string",
  wbcRange: "string",
  epithelialResult: "string",
  epithelialUnit: "string",
  epithelialRange: "string",
  bacteriaResult: "string",
  bacteriaUnit: "string",
  bacteriaRange: "string",
  mucusThreadResult: "string",
  mucusThreadUnit: "string",
  mucusThreadRange: "string",
  hyalineCastResult: "string",
  hyalineCastUnit: "string",
  hyalineCastRange: "string",
};
