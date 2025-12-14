// Tabelul 3.7 - Tolerante fundamentale pentru dimensiuni liniare nominale
// Valori în micrometri (µm) și milimetri (mm)

export interface ToleranceRow {
  range: string; // e.g., "60-80"
  rangeMin: number;
  rangeMax: number;
  IT01: number;
  IT0: number;
  IT1: number;
  IT2: number;
  IT3: number;
  IT4: number;
  IT5: number;
  IT6: number;
  IT7: number;
  IT8: number;
  IT9: number;
  IT10: number;
  IT11: number;
  IT12: number;
  IT13: number;
  IT14: number;
  IT15: number;
  IT16: number;
  IT17: number;
  IT18: number;
}

export interface PrecisionClass {
  name: string;
  description: string;
}

export const toleranceTable: ToleranceRow[] = [
  {
    range: "50-80",
    rangeMin: 50,
    rangeMax: 80,
    IT01: 0.0008,
    IT0: 0.0012,
    IT1: 0.002,
    IT2: 0.003,
    IT3: 0.005,
    IT4: 0.008,
    IT5: 0.013,
    IT6: 0.013,
    IT7: 0.019,
    IT8: 0.030,
    IT9: 0.046,
    IT10: 0.074,
    IT11: 0.120,
    IT12: 0.190,
    IT13: 0.30,
    IT14: 0.46,
    IT15: 0.74,
    IT16: 1.2,
    IT17: 1.9,
    IT18: 3.0,
  },
  {
    range: "80-120",
    rangeMin: 80.01,
    rangeMax: 120,
    IT01: 0.0008,
    IT0: 0.0012,
    IT1: 0.002,
    IT2: 0.003,
    IT3: 0.005,
    IT4: 0.008,
    IT5: 0.013,
    IT6: 0.019,
    IT7: 0.035,
    IT8: 0.054,
    IT9: 0.087,
    IT10: 0.140,
    IT11: 0.220,
    IT12: 0.35,
    IT13: 0.54,
    IT14: 0.87,
    IT15: 1.4,
    IT16: 2.2,
    IT17: 3.5,
    IT18: 5.4,
  },
];

export const precisionClasses: Record<string, PrecisionClass> = {
  IT01: { name: "IT01", description: "Precizie foarte fină" },
  IT0: { name: "IT0", description: "Precizie extrafină" },
  IT1: { name: "IT1", description: "Precizie foarte fină" },
  IT2: { name: "IT2", description: "Precizie foarte fină" },
  IT3: { name: "IT3", description: "Precizie fină" },
  IT4: { name: "IT4", description: "Precizie fină" },
  IT5: { name: "IT5", description: "Precizie fină" },
  IT6: { name: "IT6", description: "Precizie normală" },
  IT7: { name: "IT7", description: "Precizie normală" },
  IT8: { name: "IT8", description: "Precizie grosieră" },
  IT9: { name: "IT9", description: "Precizie grosieră" },
  IT10: { name: "IT10", description: "Precizie foarte grosieră" },
  IT11: { name: "IT11", description: "Precizie foarte grosieră" },
  IT12: { name: "IT12", description: "Precizie foarte grosieră" },
  IT13: { name: "IT13", description: "Precizie foarte grosieră" },
  IT14: { name: "IT14", description: "Precizie foarte grosieră" },
  IT15: { name: "IT15", description: "Precizie foarte grosieră" },
  IT16: { name: "IT16", description: "Precizie foarte grosieră" },
  IT17: { name: "IT17", description: "Precizie foarte grosieră" },
  IT18: { name: "IT18", description: "Precizie foarte grosieră" },
};

// Abaterile pentru arbori și alezaje conform ISO 286
export const fundamentalDeviations: Record<
  string,
  { upper: number; lower: number; description: string }
> = {
  a: { upper: -45, lower: -85, description: "Arbore - abatere negativă mare" },
  b: { upper: -30, lower: -60, description: "Arbore - abatere negativă" },
  c: { upper: -20, lower: -40, description: "Arbore - abatere negativă" },
  d: { upper: -10, lower: -20, description: "Arbore - abatere negativă mică" },
  e: { upper: -6, lower: -12, description: "Arbore - abatere negativă foarte mică" },
  f: { upper: -4, lower: -8, description: "Arbore - abatere negativă foarte mică" },
  g: { upper: -2, lower: -4, description: "Arbore - abatere negativă minimă" },
  h: { upper: 0, lower: 0, description: "Bază - fără abatere" },
  js: { upper: 2.5, lower: -2.5, description: "Arbore - abatere simetrică" },
  k: { upper: 3, lower: 0, description: "Arbore - abatere pozitivă mică" },
  m: { upper: 6, lower: 3, description: "Arbore - abatere pozitivă" },
  n: { upper: 10, lower: 7, description: "Arbore - abatere pozitivă" },
  p: { upper: 14, lower: 11, description: "Arbore - abatere pozitivă mare" },
  r: { upper: 18, lower: 15, description: "Arbore - abatere pozitivă mare" },
  t: { upper: 22, lower: 19, description: "Arbore - abatere pozitivă foarte mare" },
  u: { upper: 26, lower: 23, description: "Arbore - abatere pozitivă foarte mare" },
  v: { upper: 30, lower: 27, description: "Arbore - abatere pozitivă foarte mare" },
  x: { upper: 38, lower: 35, description: "Arbore - abatere pozitivă maximă" },
  y: { upper: 42, lower: 39, description: "Arbore - abatere pozitivă maximă" },
  z: { upper: 50, lower: 47, description: "Arbore - abatere pozitivă maximă" },
  A: { upper: 85, lower: 45, description: "Alezaj - abatere pozitivă mare" },
  B: { upper: 60, lower: 30, description: "Alezaj - abatere pozitivă" },
  C: { upper: 40, lower: 20, description: "Alezaj - abatere pozitivă" },
  D: { upper: 20, lower: 10, description: "Alezaj - abatere pozitivă mică" },
  E: { upper: 12, lower: 6, description: "Alezaj - abatere pozitivă foarte mică" },
  F: { upper: 8, lower: 4, description: "Alezaj - abatere pozitivă foarte mică" },
  G: { upper: 4, lower: 2, description: "Alezaj - abatere pozitivă minimă" },
  H: { upper: 0, lower: 0, description: "Bază - fără abatere" },
  JS: { upper: 2.5, lower: -2.5, description: "Alezaj - abatere simetrică" },
  K: { upper: 0, lower: -3, description: "Alezaj - abatere negativă mică" },
  M: { upper: -3, lower: -6, description: "Alezaj - abatere negativă" },
  N: { upper: -7, lower: -10, description: "Alezaj - abatere negativă" },
  P: { upper: -11, lower: -14, description: "Alezaj - abatere negativă mare" },
  R: { upper: -15, lower: -18, description: "Alezaj - abatere negativă mare" },
  T: { upper: -19, lower: -22, description: "Alezaj - abatere negativă foarte mare" },
  U: { upper: -23, lower: -26, description: "Alezaj - abatere negativă foarte mare" },
  V: { upper: -27, lower: -30, description: "Alezaj - abatere negativă foarte mare" },
  X: { upper: -35, lower: -38, description: "Alezaj - abatere negativă maximă" },
  Y: { upper: -39, lower: -42, description: "Alezaj - abatere negativă maximă" },
  Z: { upper: -47, lower: -50, description: "Alezaj - abatere negativă maximă" },
};
