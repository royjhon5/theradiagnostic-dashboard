import dayjs from "dayjs";
type Sex = "male" | "female";
interface AgeRange {
  label: string;
  minDays: number;
  maxDays: number;
  range?: string;
  rangeBySex?: {
    male: string;
    female: string;
  };
}

export const WBCRange: AgeRange[] = [
  {
    label: "0 - 1 Day",
    minDays: 0,
    maxDays: 1,
    range: "9.1 ~ 34.0",
  },
  {
    label: "2 - 4 Days",
    minDays: 2,
    maxDays: 4,
    range: "9.1 ~ 34.0",
  },
  {
    label: "5 - 7 Days",
    minDays: 5,
    maxDays: 7,
    range: "9.1 ~ 34.0",
  },
  {
    label: "8 - 14 Days",
    minDays: 8,
    maxDays: 14,
    range: "9.1 ~ 34.0",
  },
  {
    label: "15 - 30 Days",
    minDays: 15,
    maxDays: 30,
    range: "9.1 ~ 34.0",
  },
  {
    label: "1 - 2 Months",
    minDays: 31,
    maxDays: 60,
    range: "6.0 ~ 14.0",
  },
  {
    label: "3 - 5 Months",
    minDays: 61,
    maxDays: 150,
    range: "6.0 ~ 14.0",
  },
  {
    label: "6 - 11 Months",
    minDays: 151,
    maxDays: 364,
    range: "6.0 ~ 14.0",
  },
  {
    label: "1 Year - 23 Months",
    minDays: 365,
    maxDays: 729,
    range: "6.0 ~ 14.0",
  },
  {
    label: "2 - 3 Years",
    minDays: 730,
    maxDays: 1094,
    range: "4.0 ~ 12.0",
  },
  {
    label: "4 - 7 Years",
    minDays: 1460,
    maxDays: 2554,
    range: "4.0 ~ 12.0",
  },
  {
    label: "8 - 9 Years",
    minDays: 2920,
    maxDays: 3284,
    range: "4.0 ~ 12.0",
  },
  {
    label: "10 - 13 Years",
    minDays: 3650,
    maxDays: 4744,
    rangeBySex: {
      male: "4.0 ~ 12.0",
      female: "4.0 ~ 12.0",
    },
  },
  {
    label: "14 - 17 Years",
    minDays: 5110,
    maxDays: 6204,
    rangeBySex: {
      male: "4.0 ~ 12.0",
      female: "4.0 ~ 12.0",
    },
  },
  {
    label: "18+ Years",
    minDays: 6570,
    maxDays: Infinity,
    rangeBySex: {
      male: "4.0 ~ 12.0",
      female: "4.0 ~ 12.0",
    },
  },
];

function getAgeInDays(dob: string | Date): number {
  const now = dayjs();
  const birthDate = dayjs(dob);
  return now.diff(birthDate, "day");
}

// ✅ Fully typed reference range resolver
export function getReferenceRangeByAgeAndSex(
  dob: string | Date,
  sex: Sex
): string {
  const ageInDays = getAgeInDays(dob);

  const matchedRange: AgeRange | undefined = WBCRange.find(
    (range: AgeRange) =>
      ageInDays >= range.minDays && ageInDays <= range.maxDays
  );

  if (!matchedRange) return "N/A";

  if (matchedRange.rangeBySex) {
    return matchedRange.rangeBySex[sex];
  }

  return matchedRange.range ?? "N/A";
}
