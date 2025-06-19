import ChemistryComponent from "../ui/ChemistryComponent";
import ClinicalMicroscopyComponent from "../ui/ClinicalMicroscopyComponent";
import HematologyComponent from "../ui/HematologyComponent";
import ImmunologyComponent from "../ui/ImmunologyComponent";

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
];
