// =====================================================================
// PARTEA 1: TOLERANȚE (IT GRADES) 
// =====================================================================

export interface ToleranceRow {
  range: string;
  rangeMin: number;
  rangeMax: number;
  // Indexare dinamică pentru a accesa IT-ul (ex: row['IT7'])
  [key: string]: number | string; 
}

export const toleranceTable: ToleranceRow[] = [
  {
    range: "50-80",
    rangeMin: 50,
    rangeMax: 80,
    IT01: 0.0008, IT0: 0.0012, IT1: 0.002, IT2: 0.003, IT3: 0.005,
    IT4: 0.008, IT5: 0.013, IT6: 0.019, IT7: 0.030, IT8: 0.046,
    IT9: 0.074, IT10: 0.120, IT11: 0.190, IT12: 0.300, IT13: 0.460,
    IT14: 0.740, IT15: 1.200, IT16: 1.900, IT17: 3.000, IT18: 4.600,
  },
  {
    range: "80-120",
    rangeMin: 80, // Se va folosi pentru > 80
    rangeMax: 120,
    IT01: 0.001, IT0: 0.0015, IT1: 0.0025, IT2: 0.004, IT3: 0.006,
    IT4: 0.010, IT5: 0.015, IT6: 0.022, IT7: 0.035, IT8: 0.054,
    IT9: 0.087, IT10: 0.140, IT11: 0.220, IT12: 0.350, IT13: 0.540,
    IT14: 0.870, IT15: 1.400, IT16: 2.200, IT17: 3.500, IT18: 5.400,
  },
];

export interface PrecisionClass {
  name: string;
  description: string;
}

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

// =====================================================================
// PARTEA 2: ABATERI FUNDAMENTALE (Deviations) 
// =====================================================================

export interface Deviation {
  value: number;
  type: 'es' | 'ei' | 'ES' | 'EI' | 'symmetrical';
}

// --- DATE ARBORI (SHAFTS) ---
const shaft_50_65: Record<string, Deviation> = {
  a: { value: -320, type: 'es' }, b: { value: -180, type: 'es' }, c: { value: -130, type: 'es' },
  d: { value: -100, type: 'es' }, e: { value: -60, type: 'es' }, f: { value: -30, type: 'es' },
  g: { value: -10, type: 'es' }, h: { value: 0, type: 'es' }, js: { value: 0, type: 'symmetrical' },
  k: { value: 2, type: 'ei' }, m: { value: 11, type: 'ei' }, n: { value: 17, type: 'ei' },
  p: { value: 26, type: 'ei' }, r: { value: 41, type: 'ei' }, s: { value: 53, type: 'ei' },
  t: { value: 66, type: 'ei' }, u: { value: 87, type: 'ei' }, v: { value: 102, type: 'ei' },
  x: { value: 122, type: 'ei' }, y: { value: 144, type: 'ei' }, z: { value: 172, type: 'ei' }
};

const shaft_65_80: Record<string, Deviation> = {
  ...shaft_50_65, 
  n: { value: 20, type: 'ei' }, p: { value: 32, type: 'ei' }, r: { value: 43, type: 'ei' },
  s: { value: 59, type: 'ei' }, t: { value: 75, type: 'ei' }, u: { value: 102, type: 'ei' },
  v: { value: 120, type: 'ei' }, x: { value: 146, type: 'ei' }, y: { value: 174, type: 'ei' },
  z: { value: 210, type: 'ei' }
};

const shaft_80_100: Record<string, Deviation> = {
  a: { value: -410, type: 'es' }, b: { value: -240, type: 'es' }, c: { value: -180, type: 'es' },
  d: { value: -120, type: 'es' }, e: { value: -72, type: 'es' }, f: { value: -36, type: 'es' },
  g: { value: -12, type: 'es' }, h: { value: 0, type: 'es' }, js: { value: 0, type: 'symmetrical' },
  k: { value: 3, type: 'ei' }, m: { value: 13, type: 'ei' }, n: { value: 23, type: 'ei' },
  p: { value: 37, type: 'ei' }, r: { value: 51, type: 'ei' }, s: { value: 71, type: 'ei' },
  t: { value: 87, type: 'ei' }, u: { value: 124, type: 'ei' }, v: { value: 144, type: 'ei' },
  x: { value: 178, type: 'ei' }, y: { value: 214, type: 'ei' }, z: { value: 258, type: 'ei' }
};

// --- DATE ALEZAJE (HOLES) ---
const hole_50_80: Record<string, Deviation> = {
  A: { value: 360, type: 'EI' }, B: { value: 200, type: 'EI' }, C: { value: 150, type: 'EI' },
  D: { value: 100, type: 'EI' }, E: { value: 60, type: 'EI' }, F: { value: 30, type: 'EI' },
  G: { value: 10, type: 'EI' }, H: { value: 0, type: 'EI' }, JS: { value: 0, type: 'symmetrical' },
  K: { value: -2, type: 'ES' }, M: { value: -11, type: 'ES' }, N: { value: -20, type: 'ES' },
  P: { value: -32, type: 'ES' }, R: { value: -43, type: 'ES' }, S: { value: -59, type: 'ES' },
  T: { value: -75, type: 'ES' }, U: { value: -102, type: 'ES' }, V: { value: -120, type: 'ES' },
  X: { value: -146, type: 'ES' }, Y: { value: -174, type: 'ES' }, Z: { value: -210, type: 'ES' }
};

const hole_80_120: Record<string, Deviation> = {
  A: { value: 410, type: 'EI' }, B: { value: 240, type: 'EI' }, C: { value: 180, type: 'EI' },
  D: { value: 120, type: 'EI' }, E: { value: 72, type: 'EI' }, F: { value: 36, type: 'EI' },
  G: { value: 12, type: 'EI' }, H: { value: 0, type: 'EI' }, JS: { value: 0, type: 'symmetrical' },
  K: { value: -3, type: 'ES' }, M: { value: -13, type: 'ES' }, N: { value: -23, type: 'ES' },
  P: { value: -37, type: 'ES' }, R: { value: -51, type: 'ES' }, S: { value: -71, type: 'ES' },
  T: { value: -87, type: 'ES' }, U: { value: -124, type: 'ES' }, V: { value: -144, type: 'ES' },
  X: { value: -178, type: 'ES' }, Y: { value: -214, type: 'ES' }, Z: { value: -258, type: 'ES' }
};

// =====================================================================
// PARTEA 3: FUNCȚIA PRINCIPALĂ DE CALCUL
// =====================================================================

export function getDeviationData(
  dimension: number,
  type: 'shaft' | 'hole',
  position: string,
  itValueMicrometers: number
): { es?: number; ei?: number; ES?: number; EI?: number } | null {
  
  let deviations;

  // 1. SELECTARE INTERVAL CORECT
  if (type === 'shaft') {
    if (dimension <= 65) {
      deviations = shaft_50_65;
    } else if (dimension <= 80) {
      deviations = shaft_65_80;
    } else {
      deviations = shaft_80_100;
    }
  } else {
    // Alezaje
    if (dimension < 80) {
      deviations = hole_50_80;
    } else {
      deviations = hole_80_120;
    }
  }
  
  const deviation = deviations[position];
  if (!deviation) return null;

  // 2. CALCUL (Adunare/Scădere IT)
  
  // -- Pentru ARBORI --
  if (type === 'shaft') {
    if (deviation.type === 'symmetrical') {
      return { es: itValueMicrometers / 2, ei: -(itValueMicrometers / 2) };
    } else if (deviation.type === 'es') {
      // Tabelul dă es -> calculăm ei
      return { es: deviation.value, ei: deviation.value - itValueMicrometers };
    } else {
      // Tabelul dă ei -> calculăm es
      return { ei: deviation.value, es: deviation.value + itValueMicrometers };
    }
  }
  
  // -- Pentru ALEZAJE --
  if (type === 'hole') {
    if (deviation.type === 'symmetrical') {
      return { ES: itValueMicrometers / 2, EI: -(itValueMicrometers / 2) };
    } else if (deviation.type === 'EI') {
      // Tabelul dă EI -> calculăm ES
      return { EI: deviation.value, ES: deviation.value + itValueMicrometers };
    } else {
      // Tabelul dă ES -> calculăm EI
      return { ES: deviation.value, EI: deviation.value - itValueMicrometers };
    }
  }

  return null;
}