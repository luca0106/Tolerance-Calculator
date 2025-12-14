// Tabelul 2.3 - Abaterile fundamentale ISO 286
// Două intervale: ≤80mm (65-80) și >80mm (80-100)
// Sursa datelor: ISO 286-1 tables

export interface Deviation {
  value: number;                                   // Valoarea fundamentală din tabel (µm)
  type: 'es' | 'ei' | 'ES' | 'EI' | 'symmetrical'; // Tipul abaterii date de tabel
}

// =====================================================================
// SET 1: Pentru dimensiuni ≤ 80 mm (Intervalul 50-80)
// =====================================================================
export const shaftDeviations_Low: Record<string, Deviation> = {
  a: { value: -360, type: 'es' },
  b: { value: -200, type: 'es' },
  c: { value: -150, type: 'es' },
  d: { value: -100, type: 'es' },
  e: { value: -60,  type: 'es' },
  f: { value: -30,  type: 'es' },
  g: { value: -10,  type: 'es' },
  h: { value: 0,    type: 'es' },
  js: { value: 0,   type: 'symmetrical' },
  k: { value: 2,    type: 'ei' },
  m: { value: 11,   type: 'ei' },
  n: { value: 20,   type: 'ei' },
  p: { value: 32,   type: 'ei' },
  r: { value: 43,   type: 'ei' },
  s: { value: 59,   type: 'ei' },
  t: { value: 75,   type: 'ei' },
  u: { value: 102,  type: 'ei' },
  v: { value: 120,  type: 'ei' },
  x: { value: 146,  type: 'ei' },
  y: { value: 174,  type: 'ei' },
  z: { value: 210,  type: 'ei' },
};

export const holeDeviations_Low: Record<string, Deviation> = {
  A: { value: 360, type: 'EI' },
  B: { value: 200, type: 'EI' },
  C: { value: 150, type: 'EI' },
  D: { value: 100, type: 'EI' },
  E: { value: 60,  type: 'EI' },
  F: { value: 30,  type: 'EI' },
  G: { value: 10,  type: 'EI' },
  H: { value: 0,   type: 'EI' },
  JS: { value: 0,   type: 'symmetrical' },
  K: { value: -9,   type: 'ES' },
  M: { value: -11,  type: 'ES' },
  N: { value: -20,  type: 'ES' },
  P: { value: -32,  type: 'ES' },
  R: { value: -43,  type: 'ES' },
  S: { value: -59,  type: 'ES' },
  T: { value: -75,  type: 'ES' },
  U: { value: -102, type: 'ES' },
  V: { value: -120, type: 'ES' },
  X: { value: -146, type: 'ES' },
  Y: { value: -174, type: 'ES' },
  Z: { value: -210, type: 'ES' },
};

// =====================================================================
// SET 2: Pentru dimensiuni > 80 mm (Intervalul 80-100)
// =====================================================================
export const shaftDeviations_High: Record<string, Deviation> = {
  a: { value: -410, type: 'es' },
  b: { value: -240, type: 'es' },
  c: { value: -180, type: 'es' },
  d: { value: -120, type: 'es' },
  e: { value: -72,  type: 'es' },
  f: { value: -36,  type: 'es' },
  g: { value: -12,  type: 'es' },
  h: { value: 0,    type: 'es' },
  js: { value: 0,   type: 'symmetrical' },
  k: { value: 3,    type: 'ei' },
  m: { value: 13,   type: 'ei' },
  n: { value: 23,   type: 'ei' },
  p: { value: 37,   type: 'ei' },
  r: { value: 50,   type: 'ei' },
  s: { value: 71,   type: 'ei' },
  t: { value: 86,   type: 'ei' },
  u: { value: 118,  type: 'ei' },
  v: { value: 142,  type: 'ei' },
  x: { value: 174,  type: 'ei' },
  y: { value: 210,  type: 'ei' },
  z: { value: 250,  type: 'ei' },
};

export const holeDeviations_High: Record<string, Deviation> = {
  A: { value: 410, type: 'EI' },
  B: { value: 240, type: 'EI' },
  C: { value: 180, type: 'EI' },
  D: { value: 120, type: 'EI' },
  E: { value: 72,  type: 'EI' },
  F: { value: 36,  type: 'EI' },
  G: { value: 12,  type: 'EI' },
  H: { value: 0,   type: 'EI' },
  JS: { value: 0,   type: 'symmetrical' },
  K: { value: -3,   type: 'ES' },
  M: { value: -13,  type: 'ES' },
  N: { value: -23,  type: 'ES' },
  P: { value: -37,  type: 'ES' },
  R: { value: -50,  type: 'ES' },
  S: { value: -71,  type: 'ES' },
  T: { value: -86,  type: 'ES' },
  U: { value: -118, type: 'ES' },
  V: { value: -142, type: 'ES' },
  X: { value: -174, type: 'ES' },
  Y: { value: -210, type: 'ES' },
  Z: { value: -250, type: 'ES' },
};

// Helper function - selectează setul corect pe baza dimensiunii și calculează ambele abateri
export function getDeviationData(
  dimension: number,
  type: 'shaft' | 'hole',
  position: string,
  itValueMicrometers: number
): { es?: number; ei?: number; ES?: number; EI?: number } | null {
  
  // Selectez setul corect pe baza dimensiunii
  let deviations;
  if (type === 'shaft') {
    deviations = dimension <= 80 ? shaftDeviations_Low : shaftDeviations_High;
  } else {
    deviations = dimension <= 80 ? holeDeviations_Low : holeDeviations_High;
  }
  
  const deviation = deviations[position];
  
  if (!deviation) return null;

  // Pentru arbori
  if (type === 'shaft') {
    if (deviation.type === 'symmetrical') {
      return {
        es: itValueMicrometers / 2,
        ei: -(itValueMicrometers / 2),
      };
    } else if (deviation.type === 'es') {
      // Avem es, calculez ei
      return {
        es: deviation.value,
        ei: deviation.value - itValueMicrometers,
      };
    } else {
      // Avem ei, calculez es
      return {
        ei: deviation.value,
        es: deviation.value + itValueMicrometers,
      };
    }
  }
  
  // Pentru alezaje
  if (type === 'hole') {
    if (deviation.type === 'symmetrical') {
      return {
        ES: itValueMicrometers / 2,
        EI: -(itValueMicrometers / 2),
      };
    } else if (deviation.type === 'EI') {
      // Avem EI, calculez ES
      return {
        EI: deviation.value,
        ES: deviation.value + itValueMicrometers,
      };
    } else {
      // Avem ES, calculez EI
      return {
        ES: deviation.value,
        EI: deviation.value - itValueMicrometers,
      };
    }
  }

  return null;
}