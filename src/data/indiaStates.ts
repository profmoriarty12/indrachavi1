export interface StateData {
  name: string;
  abbr: string;
  melaninIndex: number;
  fitzpatrickType: string;
  toneCategory: string;
}

export const stateData: StateData[] = [
  { name: "Jammu & Kashmir", abbr: "JK", melaninIndex: 27.5, fitzpatrickType: "II-III", toneCategory: "Fair" },
  { name: "Himachal Pradesh", abbr: "HP", melaninIndex: 37.2, fitzpatrickType: "III", toneCategory: "Light-Medium" },
  { name: "Punjab", abbr: "PB", melaninIndex: 35.2, fitzpatrickType: "III", toneCategory: "Light-Medium" },
  { name: "Haryana", abbr: "HR", melaninIndex: 34.5, fitzpatrickType: "III", toneCategory: "Light-Medium" },
  { name: "Uttarakhand", abbr: "UK", melaninIndex: 39.3, fitzpatrickType: "III-IV", toneCategory: "Medium" },
  { name: "Rajasthan", abbr: "RJ", melaninIndex: 38.5, fitzpatrickType: "III-IV", toneCategory: "Medium" },
  { name: "Gujarat", abbr: "GJ", melaninIndex: 41.2, fitzpatrickType: "IV", toneCategory: "Medium-Dark" },
  { name: "Uttar Pradesh", abbr: "UP", melaninIndex: 40.1, fitzpatrickType: "IV", toneCategory: "Medium-Dark" },
  { name: "Bihar", abbr: "BR", melaninIndex: 46.4, fitzpatrickType: "IV-V", toneCategory: "Dark" },
  { name: "West Bengal", abbr: "WB", melaninIndex: 44.8, fitzpatrickType: "IV-V", toneCategory: "Dark" },
  { name: "Maharashtra", abbr: "MH", melaninIndex: 41.5, fitzpatrickType: "IV", toneCategory: "Medium-Dark" },
  { name: "Madhya Pradesh", abbr: "MP", melaninIndex: 43.1, fitzpatrickType: "IV-V", toneCategory: "Dark" },
  { name: "Chhattisgarh", abbr: "CT", melaninIndex: 48.2, fitzpatrickType: "V", toneCategory: "Dark" },
  { name: "Odisha", abbr: "OR", melaninIndex: 49.5, fitzpatrickType: "V", toneCategory: "Dark" },
  { name: "Jharkhand", abbr: "JH", melaninIndex: 47.8, fitzpatrickType: "V", toneCategory: "Dark" },
  { name: "Assam", abbr: "AS", melaninIndex: 36.8, fitzpatrickType: "III", toneCategory: "Light-Medium" },
  { name: "Sikkim", abbr: "SK", melaninIndex: 34.1, fitzpatrickType: "II-III", toneCategory: "Fair" },
  { name: "Arunachal Pradesh", abbr: "AR", melaninIndex: 35.2, fitzpatrickType: "II-III", toneCategory: "Fair" },
  { name: "Nagaland", abbr: "NL", melaninIndex: 38.4, fitzpatrickType: "III", toneCategory: "Medium" },
  { name: "Manipur", abbr: "MN", melaninIndex: 37.9, fitzpatrickType: "III", toneCategory: "Medium" },
  { name: "Mizoram", abbr: "MZ", melaninIndex: 36.5, fitzpatrickType: "III", toneCategory: "Light-Medium" },
  { name: "Tripura", abbr: "TR", melaninIndex: 40.2, fitzpatrickType: "III-IV", toneCategory: "Medium" },
  { name: "Meghalaya", abbr: "ML", melaninIndex: 37.1, fitzpatrickType: "III", toneCategory: "Light-Medium" },
  { name: "Goa", abbr: "GA", melaninIndex: 42.4, fitzpatrickType: "IV", toneCategory: "Medium-Dark" },
  { name: "Karnataka", abbr: "KA", melaninIndex: 48.6, fitzpatrickType: "V", toneCategory: "Dark" },
  { name: "Andhra Pradesh", abbr: "AP", melaninIndex: 51.2, fitzpatrickType: "V-VI", toneCategory: "Very Dark" },
  { name: "Telangana", abbr: "TS", melaninIndex: 50.4, fitzpatrickType: "V-VI", toneCategory: "Very Dark" },
  { name: "Kerala", abbr: "KL", melaninIndex: 47.9, fitzpatrickType: "V", toneCategory: "Dark" },
  { name: "Tamil Nadu", abbr: "TN", melaninIndex: 52.8, fitzpatrickType: "V-VI", toneCategory: "Very Dark" },
  { name: "Puducherry", abbr: "PY", melaninIndex: 52.1, fitzpatrickType: "V-VI", toneCategory: "Very Dark" },
];

export const getMelaninColor = (mi: number): string => {
  // Light (#F5DEB3) to Dark (#5C3317) based on melanin index
  const minMI = 27;
  const maxMI = 53;
  const t = Math.min(1, Math.max(0, (mi - minMI) / (maxMI - minMI)));
  
  const r = Math.round(245 - t * 153);
  const g = Math.round(222 - t * 171);
  const b = Math.round(179 - t * 156);
  
  return `rgb(${r}, ${g}, ${b})`;
};
