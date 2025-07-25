import dayjs from "dayjs";

type Gender = "MALE" | "FEMALE";

interface AgeDetails {
  ageInDays: number;
  ageInMonths: number;
  ageInYears: number;
}

const getAgeDetails = (dob: string): AgeDetails => {
  const now = dayjs();
  const birth = dayjs(dob);
  const ageInDays = now.diff(birth, "day");
  const ageInMonths = now.diff(birth, "month");
  const ageInYears = now.diff(birth, "year");

  return { ageInDays, ageInMonths, ageInYears };
};

export const getWBCRange = (dob: string, gender: Gender): string => {
  const { ageInDays, ageInMonths, ageInYears } = getAgeDetails(dob);

  if (ageInDays <= 1) return "9.1 ~ 34.0"; // 0–1 day
  if (ageInDays <= 4) return "9.1 ~ 34.0"; // 2–4 days
  if (ageInDays <= 7) return "9.1 ~ 34.0"; // 5–7 days
  if (ageInDays <= 14) return "9.1 ~ 34.0"; // 8–14 days
  if (ageInDays <= 30) return "9.1 ~ 34.0"; // 15–30 days

  if (ageInMonths <= 2) return "6.0 ~ 14.0"; // 1–2 months
  if (ageInMonths <= 5) return "6.0 ~ 14.0"; // 3–5 months
  if (ageInMonths <= 11) return "6.0 ~ 14.0"; // 6–11 months

  if (ageInMonths <= 23) return "6.0 ~ 14.0"; // 1 year – 23 months
  if (ageInYears <= 3) return "4.0 ~ 12.0"; // 2–3 years
  if (ageInYears <= 7) return "4.0 ~ 12.0"; // 4–7 years
  if (ageInYears <= 9) return "4.0 ~ 12.0"; // 8–9 years

  // 10+ years depend on gender
  if (ageInYears <= 13) {
    return gender === "MALE" ? "4.0 ~ 12.0" : "4.0 ~ 12.0"; // 10–13
  }
  if (ageInYears <= 17) {
    return gender === "MALE" ? "4.0 ~ 12.0" : "4.0 ~ 12.0"; // 14–17
  }
  return gender === "MALE" ? "4.0 ~ 10.5" : "4.0 ~ 10.5";
};

export const getRBCRange = (dob: string, gender: Gender): string => {
  const { ageInDays, ageInMonths, ageInYears } = getAgeDetails(dob);

  if (ageInDays <= 1) return "4.10 ~ 6.70"; // 0–1 day
  if (ageInDays <= 4) return "4.10 ~ 6.70"; // 2–4 days
  if (ageInDays <= 7) return "4.10 ~ 6.70"; // 5–7 days
  if (ageInDays <= 14) return "4.10 ~ 6.70"; // 8–14 days
  if (ageInDays <= 30) return "4.10 ~ 6.70"; // 15–30 days

  if (ageInMonths <= 2) return "3.80 ~ 5.40"; // 1–2 months
  if (ageInMonths <= 5) return "3.80 ~ 5.40"; // 3–5 months
  if (ageInMonths <= 11) return "3.80 ~ 5.40"; // 6–11 months

  if (ageInMonths <= 23) return "3.80 ~ 5.40"; // 1 year – 23 months
  if (ageInYears <= 3) return "4.0 ~ 5.30"; // 2–3 years
  if (ageInYears <= 7) return "4.0 ~ 5.30"; // 4–7 years
  if (ageInYears <= 9) return "4.0 ~ 5.30"; // 8–9 years

  // 10+ years depend on gender
  if (ageInYears <= 13) {
    return gender === "MALE" ? "4.20 ~ 5.60" : "4.10 ~ 5.30"; // 10–13
  }
  if (ageInYears <= 17) {
    return gender === "MALE" ? "4.20 ~ 5.60" : "4.20 ~ 5.30"; // 14–17
  }
  return gender === "MALE" ? "4.70 ~ 6.00" : "4.20 ~ 5.40";
};

export const getHGBRange = (dob: string, gender: Gender): string => {
  const { ageInDays, ageInMonths, ageInYears } = getAgeDetails(dob);

  if (ageInDays <= 1) return "150 ~ 240"; // 0–1 day
  if (ageInDays <= 4) return "150 ~ 240"; // 2–4 days
  if (ageInDays <= 7) return "150 ~ 240"; // 5–7 days
  if (ageInDays <= 14) return "150 ~ 240"; // 8–14 days
  if (ageInDays <= 30) return "150 ~ 240"; // 15–30 days

  if (ageInMonths <= 2) return "105 ~ 140"; // 1–2 months
  if (ageInMonths <= 5) return "105 ~ 140"; // 3–5 months
  if (ageInMonths <= 11) return "105 ~ 140"; // 6–11 months

  if (ageInMonths <= 23) return "105 ~ 140"; // 1 year – 23 months
  if (ageInYears <= 3) return "115 ~ 145"; // 2–3 years
  if (ageInYears <= 7) return "115 ~ 145"; // 4–7 years
  if (ageInYears <= 9) return "115 ~ 145"; // 8–9 years

  // 10+ years depend on gender
  if (ageInYears <= 13) {
    return gender === "MALE" ? "125 ~ 161" : "120 ~ 150"; // 10–13
  }
  if (ageInYears <= 17) {
    return gender === "MALE" ? "125 ~ 161" : "120 ~ 150"; // 14–17
  }
  return gender === "MALE" ? "135 ~ 180" : "125 ~ 160"; // 18+
};

export const getHGTRange = (dob: string, gender: Gender): string => {
  const { ageInDays, ageInMonths, ageInYears } = getAgeDetails(dob);

  if (ageInDays <= 1) return "44 ~ 70"; // 0–1 day
  if (ageInDays <= 4) return "44 ~ 70"; // 2–4 days
  if (ageInDays <= 7) return "44 ~ 70"; // 5–7 days
  if (ageInDays <= 14) return "44 ~ 70"; // 8–14 days
  if (ageInDays <= 30) return "44 ~ 70"; // 15–30 days

  if (ageInMonths <= 2) return "32 ~ 42"; // 1–2 months
  if (ageInMonths <= 5) return "32 ~ 42"; // 3–5 months
  if (ageInMonths <= 11) return "32 ~ 42"; // 6–11 months

  if (ageInMonths <= 23) return "32 ~ 42"; // 1 year – 23 months
  if (ageInYears <= 3) return "33 ~ 43"; // 2–3 years
  if (ageInYears <= 7) return "33 ~ 43"; // 4–7 years
  if (ageInYears <= 9) return "33 ~ 43"; // 8–9 years

  // 10+ years depend on gender
  if (ageInYears <= 13) {
    return gender === "MALE" ? "42 ~ 52" : "35 ~ 45"; // 10–13
  }
  if (ageInYears <= 17) {
    return gender === "MALE" ? "42 ~ 52" : "35 ~ 45"; // 14–17
  }
  return gender === "MALE" ? "42 ~ 52" : "37 ~ 47"; // 18+
};

export const getMVCRange = (dob: string, gender: Gender): string => {
  const { ageInDays, ageInMonths, ageInYears } = getAgeDetails(dob);

  if (ageInDays <= 1) return "102 ~ 115"; // 0–1 day
  if (ageInDays <= 4) return "102 ~ 115"; // 2–4 days
  if (ageInDays <= 7) return "102 ~ 115"; // 5–7 days
  if (ageInDays <= 14) return "102 ~ 115"; // 8–14 days
  if (ageInDays <= 30) return "102 ~ 115"; // 15–30 days

  if (ageInMonths <= 2) return "72 ~ 88"; // 1–2 months
  if (ageInMonths <= 5) return "72 ~ 88"; // 3–5 months
  if (ageInMonths <= 11) return "72 ~ 88"; // 6–11 months

  if (ageInMonths <= 23) return "72 ~ 88"; // 1 year – 23 months
  if (ageInYears <= 3) return "76 ~ 90"; // 2–3 years
  if (ageInYears <= 7) return "76 ~ 90"; // 4–7 years
  if (ageInYears <= 9) return "76 ~ 90"; // 8–9 years

  // 10+ years depend on gender
  if (ageInYears <= 13) {
    return gender === "MALE" ? "78 ~ 95" : "78 ~ 95"; // 10–13
  }
  if (ageInYears <= 17) {
    return gender === "MALE" ? "78 ~ 95" : "78 ~ 95"; // 14–17
  }
  return gender === "MALE" ? "78 ~ 100" : "78 ~ 100"; // 18+
};

export const getMCHRange = (dob: string, gender: Gender): string => {
  const { ageInDays, ageInMonths, ageInYears } = getAgeDetails(dob);

  if (ageInDays <= 1) return "33 ~ 39"; // 0–1 day
  if (ageInDays <= 4) return "33 ~ 39"; // 2–4 days
  if (ageInDays <= 7) return "33 ~ 39"; // 5–7 days
  if (ageInDays <= 14) return "33 ~ 39"; // 8–14 days
  if (ageInDays <= 30) return "33 ~ 39"; // 15–30 days

  if (ageInMonths <= 2) return "24 ~ 30"; // 1–2 months
  if (ageInMonths <= 5) return "24 ~ 30"; // 3–5 months
  if (ageInMonths <= 11) return "24 ~ 30"; // 6–11 months

  if (ageInMonths <= 23) return "24 ~ 30"; // 1 year – 23 months
  if (ageInYears <= 3) return "25 ~ 31"; // 2–3 years
  if (ageInYears <= 7) return "25 ~ 31"; // 4–7 years
  if (ageInYears <= 9) return "25 ~ 31"; // 8–9 years

  // 10+ years depend on gender
  if (ageInYears <= 13) {
    return gender === "MALE" ? "26 ~ 32" : "26 ~ 32"; // 10–13
  }
  if (ageInYears <= 17) {
    return gender === "MALE" ? "26 ~ 32" : "26 ~ 32"; // 14–17
  }
  return gender === "MALE" ? "27 ~ 31" : "27 ~ 31"; // 18+
};

export const getMCHCRange = (dob: string, gender: Gender): string => {
  const { ageInDays, ageInMonths, ageInYears } = getAgeDetails(dob);

  if (ageInDays <= 1) return "32 ~ 36"; // 0–1 day
  if (ageInDays <= 4) return "32 ~ 36"; // 2–4 days
  if (ageInDays <= 7) return "32 ~ 36"; // 5–7 days
  if (ageInDays <= 14) return "32 ~ 36"; // 8–14 days
  if (ageInDays <= 30) return "32 ~ 36"; // 15–30 days

  if (ageInMonths <= 2) return "32 ~ 36"; // 1–2 months
  if (ageInMonths <= 5) return "32 ~ 36"; // 3–5 months
  if (ageInMonths <= 11) return "32 ~ 36"; // 6–11 months

  if (ageInMonths <= 23) return "32 ~ 36"; // 1 year – 23 months
  if (ageInYears <= 3) return "32 ~ 36"; // 2–3 years
  if (ageInYears <= 7) return "32 ~ 36"; // 4–7 years
  if (ageInYears <= 9) return "32 ~ 36"; // 8–9 years

  // 10+ years depend on gender
  if (ageInYears <= 13) {
    return gender === "MALE" ? "32 ~ 36" : "32 ~ 36"; // 10–13
  }
  if (ageInYears <= 17) {
    return gender === "MALE" ? "32 ~ 36" : "32 ~ 36"; // 14–17
  }
  return gender === "MALE" ? "32 ~ 36" : "32 ~ 36"; // 18+
};

export const getRDWRange = (dob: string, gender: Gender): string => {
  const { ageInDays, ageInMonths, ageInYears } = getAgeDetails(dob);

  if (ageInDays <= 1) return "11.0 ~ 16.0"; // 0–1 day
  if (ageInDays <= 4) return "11.0 ~ 16.0"; // 2–4 days
  if (ageInDays <= 7) return "11.0 ~ 16.0"; // 5–7 days
  if (ageInDays <= 14) return "11.0 ~ 16.0"; // 8–14 days
  if (ageInDays <= 30) return "11.0 ~ 16.0"; // 15–30 days

  if (ageInMonths <= 2) return "11.0 ~ 16.0"; // 1–2 months
  if (ageInMonths <= 5) return "11.0 ~ 16.0"; // 3–5 months
  if (ageInMonths <= 11) return "11.0 ~ 16.0"; // 6–11 months

  if (ageInMonths <= 23) return "11.0 ~ 16.0"; // 1 year – 23 months
  if (ageInYears <= 3) return "11.0 ~ 16.0"; // 2–3 years
  if (ageInYears <= 7) return "11.0 ~ 16.0"; // 4–7 years
  if (ageInYears <= 9) return "11.0 ~ 16.0"; // 8–9 years

  // 10+ years depend on gender
  if (ageInYears <= 13) {
    return gender === "MALE" ? "11.0 ~ 16.0" : "11.0 ~ 16.0"; // 10–13
  }
  if (ageInYears <= 17) {
    return gender === "MALE" ? "11.0 ~ 16.0" : "11.0 ~ 16.0"; // 14–17
  }
  return gender === "MALE" ? "11.0 ~ 16.0" : "11.0 ~ 16.0"; // 18+
};

export const getPLTRange = (dob: string, gender: Gender): string => {
  const { ageInDays, ageInMonths, ageInYears } = getAgeDetails(dob);

  if (ageInDays <= 1) return "150 ~ 450"; // 0–1 day
  if (ageInDays <= 4) return "150 ~ 450"; // 2–4 days
  if (ageInDays <= 7) return "150 ~ 450"; // 5–7 days
  if (ageInDays <= 14) return "150 ~ 450"; // 8–14 days
  if (ageInDays <= 30) return "150 ~ 450"; // 15–30 days

  if (ageInMonths <= 2) return "150 ~ 450"; // 1–2 months
  if (ageInMonths <= 5) return "150 ~ 450"; // 3–5 months
  if (ageInMonths <= 11) return "150 ~ 450"; // 6–11 months

  if (ageInMonths <= 23) return "150 ~ 450"; // 1 year – 23 months
  if (ageInYears <= 3) return "150 ~ 450"; // 2–3 years
  if (ageInYears <= 7) return "150 ~ 450"; // 4–7 years
  if (ageInYears <= 9) return "150 ~ 450"; // 8–9 years

  // 10+ years depend on gender
  if (ageInYears <= 13) {
    return gender === "MALE" ? "150 ~ 450" : "150 ~ 450"; // 10–13
  }
  if (ageInYears <= 17) {
    return gender === "MALE" ? "150 ~ 450" : "150 ~ 450"; // 14–17
  }
  return gender === "MALE" ? "150 ~ 450" : "150 ~ 450"; // 18+
};

export const getSEGRange = (dob: string, gender: Gender): string => {
  const { ageInDays, ageInMonths, ageInYears } = getAgeDetails(dob);

  if (ageInDays <= 1) return "37.0 ~ 67.0"; // 0–1 day
  if (ageInDays <= 4) return "30.0 ~ 60.0"; // 2–4 days
  if (ageInDays <= 7) return "27.0 ~ 51.0"; // 5–7 days
  if (ageInDays <= 14) return "22.0 ~ 46.0"; // 8–14 days
  if (ageInDays <= 30) return "20.0 ~ 40.0"; // 15–30 days

  if (ageInMonths <= 2) return "18.0 ~ 38.0"; // 1–2 months
  if (ageInMonths <= 5) return "20.0 ~ 40.0"; // 3–5 months
  if (ageInMonths <= 11) return "22.0 ~ 46.0"; // 6–11 months

  if (ageInMonths <= 23) return "22.0 ~ 46.0"; // 1 year – 23 months
  if (ageInYears <= 3) return "30.0 ~ 60.0"; // 2–3 years
  if (ageInYears <= 7) return "23.0 ~ 53.0"; // 4–7 years
  if (ageInYears <= 9) return "23.0 ~ 53.0"; // 8–9 years

  // 10+ years depend on gender
  if (ageInYears <= 13) {
    return gender === "MALE" ? "23.0 ~ 53.0" : "23.0 ~ 53.0"; // 10–13
  }
  if (ageInYears <= 17) {
    return gender === "MALE" ? "50.0 ~ 70.0" : "50.0 ~ 70.0"; // 14–17
  }
  return gender === "MALE" ? "150.0 ~ 70.0" : "50.0 ~ 70.0"; // 18+
};

export const getLYMRange = (dob: string, gender: Gender): string => {
  const { ageInDays, ageInMonths, ageInYears } = getAgeDetails(dob);

  if (ageInDays <= 1) return "18.0 ~ 38.0"; // 0–1 day
  if (ageInDays <= 4) return "16.0 ~ 46.0"; // 2–4 days
  if (ageInDays <= 7) return "24.0 ~ 54.0"; // 5–7 days
  if (ageInDays <= 14) return "30.0 ~ 62.0"; // 8–14 days
  if (ageInDays <= 30) return "41.0 ~ 61.0"; // 15–30 days

  if (ageInMonths <= 2) return "42.0 ~ 72.0"; // 1–2 months
  if (ageInMonths <= 5) return "45.0 ~ 75.0"; // 3–5 months
  if (ageInMonths <= 11) return "48.0 ~ 78.0"; // 6–11 months

  if (ageInMonths <= 23) return "37.0 ~ 73.0"; // 1 year – 23 months
  if (ageInYears <= 3) return "37.0 ~ 73.0"; // 2–3 years
  if (ageInYears <= 7) return "29.0 ~ 65.0"; // 4–7 years
  if (ageInYears <= 9) return "23.0 ~ 53.0"; // 8–9 years

  // 10+ years depend on gender
  if (ageInYears <= 13) {
    return gender === "MALE" ? "23.0 ~ 53.0" : "23.0 ~ 53.0"; // 10–13
  }
  if (ageInYears <= 17) {
    return gender === "MALE" ? "23.0 ~ 53.0" : "23.0 ~ 53.0"; // 14–17
  }
  return gender === "MALE" ? "18.0 ~ 42.0" : "18.0 ~ 42.0"; // 18+
};

export const getMONRange = (dob: string, gender: Gender): string => {
  const { ageInDays, ageInMonths, ageInYears } = getAgeDetails(dob);

  if (ageInDays <= 1) return "1.0 ~ 12.0"; // 0–1 day
  if (ageInDays <= 4) return "3.0 ~ 14.0"; // 2–4 days
  if (ageInDays <= 7) return "4.0 ~ 17.0"; // 5–7 days
  if (ageInDays <= 14) return "4.0 ~ 17.0"; // 8–14 days
  if (ageInDays <= 30) return "2.0 ~ 15.0"; // 15–30 days

  if (ageInMonths <= 2) return "3.0 ~ 14.0"; // 1–2 months
  if (ageInMonths <= 5) return "2.0 ~ 11.0"; // 3–5 months
  if (ageInMonths <= 11) return "2.0 ~ 11.0"; // 6–11 months

  if (ageInMonths <= 23) return "2.0 ~ 11.0"; // 1 year – 23 months
  if (ageInYears <= 3) return "2.0 ~ 11.0"; // 2–3 years
  if (ageInYears <= 7) return "2.0 ~ 11.0"; // 4–7 years
  if (ageInYears <= 9) return "2.0 ~ 11.0"; // 8–9 years

  // 10+ years depend on gender
  if (ageInYears <= 13) {
    return gender === "MALE" ? "2.0 ~ 11.0" : "2.0 ~ 11.0"; // 10–13
  }
  if (ageInYears <= 17) {
    return gender === "MALE" ? "2.0 ~ 11.0" : "2.0 ~ 11.0"; // 14–17
  }
  return gender === "MALE" ? "2.0 ~ 11.0" : "2.0 ~ 11.0"; // 18+
};

export const getBANRange = (dob: string, gender: Gender): string => {
  const { ageInDays, ageInMonths, ageInYears } = getAgeDetails(dob);

  if (ageInDays <= 1) return "4.0 ~ 14.0"; // 0–1 day
  if (ageInDays <= 4) return "3.0 ~ 11.0"; // 2–4 days
  if (ageInDays <= 7) return "0.0 ~ 6.0"; // 5–7 days
  if (ageInDays <= 14) return "4.0 ~ 17.0"; // 8–14 days
  if (ageInDays <= 30) return "2.0 ~ 15.0"; // 15–30 days

  if (ageInMonths <= 2) return "3.0 ~ 14.0"; // 1–2 months
  if (ageInMonths <= 5) return "2.0 ~ 11.0"; // 3–5 months
  if (ageInMonths <= 11) return "2.0 ~ 11.0"; // 6–11 months

  if (ageInMonths <= 23) return "2.0 ~ 11.0"; // 1 year – 23 months
  if (ageInYears <= 3) return "2.0 ~ 11.0"; // 2–3 years
  if (ageInYears <= 7) return "2.0 ~ 11.0"; // 4–7 years
  if (ageInYears <= 9) return "2.0 ~ 11.0"; // 8–9 years

  // 10+ years depend on gender
  if (ageInYears <= 13) {
    return gender === "MALE" ? "2.0 ~ 11.0" : "2.0 ~ 11.0"; // 10–13
  }
  if (ageInYears <= 17) {
    return gender === "MALE" ? "2.0 ~ 11.0" : "2.0 ~ 11.0"; // 14–17
  }
  return gender === "MALE" ? "2.0 ~ 11.0" : "2.0 ~ 11.0"; // 18+
};
