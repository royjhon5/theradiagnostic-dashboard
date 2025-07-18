import ChemistryComponent from "../ui/ChemistryComponent";
import ClinicalMicroscopyComponent from "../ui/ClinicalMicroscopyComponent";
import HematologyComponent from "../ui/HematologyComponent";
import ImmunologyComponent from "../ui/ImmunologyComponent";
import SerologyComponent from "../ui/Serology";
import SerologyHIVComponent from "../ui/SerologyHIV";

export const TabsData = [
  {
    label: "Hematology",
    value: "hematology",
    content: <HematologyComponent />,
  },
  {
    label: "Chemistry",
    value: "chemistry",
    content: <ChemistryComponent />,
  },
  {
    label: "Clinical Microscopy",
    value: "clinicalmicroscopy",
    content: <ClinicalMicroscopyComponent />,
  },
  {
    label: "Immunology",
    value: "immunology",
    content: <ImmunologyComponent />,
  },
  {
    label: "Serology",
    value: "serology",
    content: <SerologyComponent />,
  },
  {
    label: "Serology HIV",
    value: "serologyhiv",
    content: <SerologyHIVComponent />,
  },
];
export const uranilysisColorOption = [
  { label: "STRAW", value: "STRAW" },
  { label: "LIGHT YELLOW", value: "LIGHT YELLOW" },
  { label: "YELLOW", value: "YELLOW" },
  { label: "DARK YELLOW", value: "DARK YELLOW" },
  { label: "AMBER", value: "AMBER" },
];

export const urinalysisTransparencyOption = [
  { label: "CLEAR", value: "CLEAR" },
  { label: "SLIGHTLY CLOUDY", value: "SLIGHTLY CLOUDY" },
  { label: "CLOUDY", value: "CLOUDY" },
];

export const phOption = [
  { label: "5.5", value: "5.5" },
  { label: "6.0", value: "6.0" },
  { label: "6.5", value: "6.5" },
  { label: "7.0", value: "7.0" },
  { label: "7.5", value: "7.5" },
  { label: "8.0", value: "8.0" },
  { label: "8.5", value: "8.5" },
  { label: "9.0", value: "9.0" },
];

export const spGravityOption = [
  { label: "1.003", value: "1.003" },
  { label: "1.004", value: "1.004" },
  { label: "1.005", value: "1.005" },
  { label: "1.010", value: "1.010" },
  { label: "1.015", value: "1.015" },
  { label: "1.020", value: "1.020" },
  { label: "1.025", value: "1.025" },
  { label: "1.030", value: "1.030" },
];

export const glucoseOption = [
  { label: "NEGATIVE", value: "NEGATIVE" },
  { label: "TRACE", value: "TRACE" },
  { label: "1+", value: "1+" },
  { label: "2+", value: "2+" },
  { label: "3+", value: "3+" },
  { label: "4+", value: "4+" },
];

export const proteinOption = [
  { label: "NEGATIVE", value: "NEGATIVE" },
  { label: "TRACE", value: "TRACE" },
  { label: "1+", value: "1+" },
  { label: "2+", value: "2+" },
  { label: "3+", value: "3+" },
  { label: "4+", value: "4+" },
];

export const urobilinogenOption = [
  { label: "<1.0 (Normal)", value: "<1.0 (Normal)" },
  { label: "2.0 (1+)", value: "2.0 (1+)" },
  { label: "4.0 (2+)", value: "4.0 (2+)" },
  { label: "8.0 (3+)", value: "8.0 (3+)" },
  { label: "12.0 (4+)", value: "12.0 (4+)" },
];

export const bilirubinOption = [
  { label: "NEGATIVE", value: "NEGATIVE" },
  { label: "0.5 (1+)", value: "0.5 (1+)" },
  { label: "1.0 (2+)", value: "1.0 (2+)" },
  { label: "2.0 (3+)", value: "2.0 (3+)" },
];

export const ketonesOption = [
  { label: "NEGATIVE", value: "NEGATIVE" },
  { label: "10 (1+)", value: "10 (1+)" },
  { label: "30 (2+)", value: "30 (2+)" },
  { label: "80 (3+)", value: "80 (3+)" },
];

export const nitriteOption = [
  { label: "POSITIVE", value: "POSITIVE" },
  { label: "NEGATIVE", value: "NEGATIVE" },
];

export const leukocytesOption = [
  { label: "NEGATIVE", value: "NEGATIVE" },
  { label: "TRACE", value: "TRACE" },
  { label: "1+", value: "1+" },
  { label: "2+", value: "2+" },
  { label: "3+", value: "3+" },
  { label: "4+", value: "4+" },
];

export const bloodOption = [
  { label: "NEGATIVE", value: "NEGATIVE" },
  { label: "TRACE", value: "TRACE" },
  { label: "1+", value: "1+" },
  { label: "2+", value: "2+" },
  { label: "3+", value: "3+" },
  { label: "4+", value: "4+" },
];

export const universalOption = [
  { label: "RARE", value: "RARE" },
  { label: "FEW", value: "FEW" },
  { label: "MODERATE", value: "MODERATE" },
  { label: "ABUNDANT", value: "ABUNDANT" },
  { label: "TNTC", value: "TNTC" },
];

export const fecalColorOption = [
  { label: "BROWN", value: "BROWN" },
  { label: "LIGHT BROWN", value: "LIGHT BROWN" },
  { label: "YELLOW", value: "YELLOW" },
  { label: "RED", value: "RED" },
  { label: "BLACK", value: "BLACK" },
];

export const fecalConsistencyOption = [
  { label: "FORMED", value: "FORMED" },
  { label: "SEMI-FORMED", value: "SEMI-FORMED" },
  { label: "WATERY", value: "WATERY" },
  { label: "MUCCOID", value: "MUCCOID" },
];

export const fecaluniversalOption = [
  { label: "RARE", value: "RARE" },
  { label: "FEW", value: "FEW" },
  { label: "MODERATE", value: "MODERATE" },
  { label: "ABUNDANT", value: "ABUNDANT" },
];

export const reactiveAndNonOption = [
  { label: "REACTIVE", value: "REACTIVE" },
  { label: "NON REACTIVE", value: "NON REACTIVE" },
];

export const serologyMethod = [
  { label: "Immunochromatohraphy", value: "Immunochromatohraphy" },
];

export const serologyHIVTestOption = [
  {
    label: "This result has been released",
    value: "This result has been released",
  },
];

export const AntiHcvRemarksOption = [
  {
    label:
      "This is only a screening test. If clinically warranted, further testing using ELISA/ECLIA or HCV-RNA may be recommended for confirmation",
    value:
      "This is only a screening test. If clinically warranted, further testing using ELISA/ECLIA or HCV-RNA may be recommended for confirmation",
  },
];

export const AntiHavIgGRemarksOption = [
  {
    label:
      "This is only a screening test. If clinically warranted, further testing using ELISA/ECLIA may be recommended for confirmation",
    value:
      "This is only a screening test. If clinically warranted, further testing using ELISA/ECLIA may be recommended for confirmation",
  },
];

export const SyphiilisRemarksOption = [
  {
    label:
      "This is only a screening test. If clinically warranted, further testing using ELISA/ECLIA or FTA-Abs may be recommended for confirmation",
    value:
      "This is only a screening test. If clinically warranted, further testing using ELISA/ECLIA or FTA-Abs may be recommended for confirmation",
  },
];

export const HbsagRemarksOption = [
  {
    label:
      "This is only a screening test. If clinically warranted, further testing using ELISA/ECLIA or HBV-DNA may be recommended for confirmation",
    value:
      "This is only a screening test. If clinically warranted, further testing using ELISA/ECLIA or HBV-DNA may be recommended for confirmation",
  },
];
