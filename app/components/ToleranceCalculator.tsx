import { useState, useEffect, useRef } from 'react';
import { getDeviationData, toleranceTable } from '../data/isoData';
import type { ToleranceRow } from '../data/isoData';

// Traduceri
const translations = {
  ro: {
    title: 'Calculator Toleranțe Dimensionale',
    switchToLight: 'Schimbă la mod clar',
    switchToDark: 'Schimbă la mod întunecat',
    selection: 'Selecția ta:',
    type: 'Tip',
    shaft: 'Arbore',
    hole: 'Alezaj',
    position: 'Poziție',
    precision: 'Precizie',
    dimension: 'Dimensiune',
    nominalDimension: '📏 Dimensiune nominală (mm):',
    interval: 'Interval: 60 - 100 mm',
    typeLabel: '🔧 Tip:',
    positionLabel: '📍 Poziția toleranței:',
    precisionLabel: '⚙️ Treapta de precizie:',
    calculate: '✓ Calculează',
    error_number: '❌ Introduceți o valoare numerică',
    error_range: '❌ Dimensiunea trebuie să fie între 60 și 100 mm',
    error_interval: '❌ Nu s-a găsit interval pentru această dimensiune',
    error_precision: '❌ Treapta de precizie selectată nu este disponibilă',
    error_position: '❌ Poziția toleranței selectată nu este disponibilă',
    results: '📊 Rezultate',
    dimensionMax: 'Dimensiune maximă',
    dimensionMin: 'Dimensiune minimă',
    upperDeviation: 'Abatere superioară (ES/es)',
    lowerDeviation: 'Abatere inferioară (EI/ei)',
    fundamentalTolerance: 'Toleranță fundamentală',
    calculatedTolerance: 'Toleranță (calculată)',
    dimensionLimits: '📐 Dimensiuni limită',
    successMsg: '✅ Calculul s-a realizat cu succes!',
    isoStandard: 'Valorile afișate sunt conform standardului ISO 286-1.',
    dimensionRange: 'Interval de dimensiuni:',
    shaft_a: 'a - Abatere negativă mare',
    shaft_b: 'b - Abatere negativă',
    shaft_c: 'c - Abatere negativă',
    shaft_d: 'd - Abatere negativă mică',
    shaft_e: 'e - Abatere negativă foarte mică',
    shaft_f: 'f - Abatere negativă foarte mică',
    shaft_g: 'g - Abatere negativă minimă',
    shaft_h: 'h - Bază (fără abatere)',
    shaft_js: 'js - Abatere simetrică',
    shaft_k: 'k - Abatere pozitivă mică',
    shaft_m: 'm - Abatere pozitivă',
    shaft_n: 'n - Abatere pozitivă',
    shaft_p: 'p - Abatere pozitivă mare',
    shaft_r: 'r - Abatere pozitivă mare',
    shaft_s: 's - Abatere pozitivă',
    shaft_t: 't - Abatere pozitivă foarte mare',
    shaft_u: 'u - Abatere pozitivă foarte mare',
    shaft_v: 'v - Abatere pozitivă foarte mare',
    shaft_x: 'x - Abatere pozitivă maximă',
    shaft_y: 'y - Abatere pozitivă maximă',
    shaft_z: 'z - Abatere pozitivă maximă',
    hole_A: 'A - Abatere pozitivă mare',
    hole_B: 'B - Abatere pozitivă',
    hole_C: 'C - Abatere pozitivă',
    hole_D: 'D - Abatere pozitivă mică',
    hole_E: 'E - Abatere pozitivă foarte mică',
    hole_F: 'F - Abatere pozitivă foarte mică',
    hole_G: 'G - Abatere pozitivă minimă',
    hole_H: 'H - Bază (fără abatere)',
    hole_JS: 'JS - Abatere simetrică',
    hole_K: 'K - Abatere negativă mică',
    hole_M: 'M - Abatere negativă',
    hole_N: 'N - Abatere negativă',
    hole_P: 'P - Abatere negativă mare',
    hole_R: 'R - Abatere negativă mare',
    hole_S: 'S - Abatere negativă',
    hole_T: 'T - Abatere negativă foarte mare',
    hole_U: 'U - Abatere negativă foarte mare',
    hole_V: 'V - Abatere negativă foarte mare',
    hole_X: 'X - Abatere negativă maximă',
    hole_Y: 'Y - Abatere negativă maximă',
    hole_Z: 'Z - Abatere negativă maximă',
    IT01: 'IT01 - Precizie foarte fină',
    IT0: 'IT0 - Precizie extrafină',
    IT1: 'IT1 - Precizie foarte fină',
    IT2: 'IT2 - Precizie foarte fină',
    IT3: 'IT3 - Precizie fină',
    IT4: 'IT4 - Precizie fină',
    IT5: 'IT5 - Precizie fină',
    IT6: 'IT6 - Precizie normală',
    IT7: 'IT7 - Precizie normală',
    IT8: 'IT8 - Precizie grosieră',
    IT9: 'IT9 - Precizie grosieră',
    IT10: 'IT10 - Precizie foarte grosieră',
    IT11: 'IT11 - Precizie foarte grosieră',
    IT12: 'IT12 - Precizie foarte grosieră',
    IT13: 'IT13 - Precizie foarte grosieră',
    IT14: 'IT14 - Precizie foarte grosieră',
    IT15: 'IT15 - Precizie foarte grosieră',
    IT16: 'IT16 - Precizie foarte grosieră',
    IT17: 'IT17 - Precizie foarte grosieră',
    IT18: 'IT18 - Precizie foarte grosieră',
  },
  en: {
    title: 'ISO 286 Tolerance Calculator',
    switchToLight: 'Switch to Light Mode',
    switchToDark: 'Switch to Dark Mode',
    selection: 'Your Selection:',
    type: 'Type',
    shaft: 'Shaft',
    hole: 'Hole',
    position: 'Position',
    precision: 'Precision',
    dimension: 'Dimension',
    nominalDimension: '📏 Nominal Dimension (mm):',
    interval: 'Range: 60 - 100 mm',
    typeLabel: '🔧 Type:',
    positionLabel: '📍 Tolerance Position:',
    precisionLabel: '⚙️ Precision Grade:',
    calculate: '✓ Calculate',
    error_number: '❌ Enter a numeric value',
    error_range: '❌ Dimension must be between 60 and 100 mm',
    error_interval: '❌ No interval found for this dimension',
    error_precision: '❌ Selected precision grade is not available',
    error_position: '❌ Selected tolerance position is not available',
    results: '📊 Results',
    dimensionMax: 'Maximum Dimension',
    dimensionMin: 'Minimum Dimension',
    upperDeviation: 'Upper Deviation (ES/es)',
    lowerDeviation: 'Lower Deviation (EI/ei)',
    fundamentalTolerance: 'Fundamental Tolerance',
    calculatedTolerance: 'Calculated Tolerance',
    dimensionLimits: '📐 Dimension Limits',
    successMsg: '✅ Calculation completed successfully!',
    isoStandard: 'Values are displayed according to ISO 286-1 standard.',
    dimensionRange: 'Dimension range:',
    shaft_a: 'a - Large negative deviation',
    shaft_b: 'b - Negative deviation',
    shaft_c: 'c - Negative deviation',
    shaft_d: 'd - Small negative deviation',
    shaft_e: 'e - Very small negative deviation',
    shaft_f: 'f - Very small negative deviation',
    shaft_g: 'g - Minimal negative deviation',
    shaft_h: 'h - Basis (no deviation)',
    shaft_js: 'js - Symmetric deviation',
    shaft_k: 'k - Small positive deviation',
    shaft_m: 'm - Positive deviation',
    shaft_n: 'n - Positive deviation',
    shaft_p: 'p - Large positive deviation',
    shaft_r: 'r - Large positive deviation',
    shaft_s: 's - Positive deviation',
    shaft_t: 't - Very large positive deviation',
    shaft_u: 'u - Very large positive deviation',
    shaft_v: 'v - Very large positive deviation',
    shaft_x: 'x - Maximum positive deviation',
    shaft_y: 'y - Maximum positive deviation',
    shaft_z: 'z - Maximum positive deviation',
    hole_A: 'A - Large positive deviation',
    hole_B: 'B - Positive deviation',
    hole_C: 'C - Positive deviation',
    hole_D: 'D - Small positive deviation',
    hole_E: 'E - Very small positive deviation',
    hole_F: 'F - Very small positive deviation',
    hole_G: 'G - Minimal positive deviation',
    hole_H: 'H - Basis (no deviation)',
    hole_JS: 'JS - Symmetric deviation',
    hole_K: 'K - Small negative deviation',
    hole_M: 'M - Negative deviation',
    hole_N: 'N - Negative deviation',
    hole_P: 'P - Large negative deviation',
    hole_R: 'R - Large negative deviation',
    hole_S: 'S - Negative deviation',
    hole_T: 'T - Very large negative deviation',
    hole_U: 'U - Very large negative deviation',
    hole_V: 'V - Very large negative deviation',
    hole_X: 'X - Maximum negative deviation',
    hole_Y: 'Y - Maximum negative deviation',
    hole_Z: 'Z - Maximum negative deviation',
    IT01: 'IT01 - Ultra precise',
    IT0: 'IT0 - Extra fine precision',
    IT1: 'IT1 - Very fine precision',
    IT2: 'IT2 - Very fine precision',
    IT3: 'IT3 - Fine precision',
    IT4: 'IT4 - Fine precision',
    IT5: 'IT5 - Fine precision',
    IT6: 'IT6 - Normal precision',
    IT7: 'IT7 - Normal precision',
    IT8: 'IT8 - Coarse precision',
    IT9: 'IT9 - Coarse precision',
    IT10: 'IT10 - Very coarse precision',
    IT11: 'IT11 - Very coarse precision',
    IT12: 'IT12 - Very coarse precision',
    IT13: 'IT13 - Very coarse precision',
    IT14: 'IT14 - Very coarse precision',
    IT15: 'IT15 - Very coarse precision',
    IT16: 'IT16 - Very coarse precision',
    IT17: 'IT17 - Very coarse precision',
    IT18: 'IT18 - Very coarse precision',
  }
};

export default function ToleranceCalculator() {
  const [dimension, setDimension] = useState('');
  const [type, setType] = useState<'shaft' | 'hole'>('shaft');
  const [position, setPosition] = useState('h');
  const [precisionClass, setPrecisionClass] = useState('IT6');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<'ro' | 'en'>('ro');
  const [unit, setUnit] = useState<'um' | 'mm'>('um');

  // Ref pentru scroll la rezultate
  const resultsRef = useRef<HTMLDivElement>(null);

  // Detecteaza preferințele de sistem pentru dark mode
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  // Helper pentru traduceri
  const t = (key: keyof typeof translations.ro) => translations[language][key];

  // Tema CSS
  const theme = {
    bg: isDarkMode ? '#0f172a' : '#f0f9ff',
    bgCard: isDarkMode ? '#1e293b' : '#ffffff',
    textPrimary: isDarkMode ? '#f1f5f9' : '#1e293b',
    textSecondary: isDarkMode ? '#cbd5e1' : '#94a3b8',
    border: isDarkMode ? '#334155' : '#cbd5e1',
    yellowBg: isDarkMode ? '#713f12' : '#fef3c7',
    yellowBorder: isDarkMode ? '#b45309' : '#f59e0b',
    yellowText: isDarkMode ? '#fcd34d' : '#92400e',
    buttonBg: isDarkMode ? '#4f46e5' : '#4f46e5',
    buttonHover: isDarkMode ? '#6366f1' : '#4338ca',
    errorBg: isDarkMode ? '#7f1d1d' : '#fee2e2',
    errorBorder: isDarkMode ? '#991b1b' : '#fecaca',
    errorText: isDarkMode ? '#fca5a5' : '#991b1b',
    successBg: isDarkMode ? '#15803d' : '#dcfce7',
    successText: isDarkMode ? '#86efac' : '#166534',
    inputBg: isDarkMode ? '#334155' : '#ffffff',
  };

  // Opțiuni disponibile pentru poziții și IT
  const shaftPositions = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'js', 'k', 'm', 'n', 'p', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z'];
  const holePositions = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'JS', 'K', 'M', 'N', 'P', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z'];
  const itClasses = ['IT01', 'IT0', 'IT1', 'IT2', 'IT3', 'IT4', 'IT5', 'IT6', 'IT7', 'IT8', 'IT9', 'IT10', 'IT11', 'IT12', 'IT13', 'IT14', 'IT15', 'IT16', 'IT17', 'IT18'];

  const handleCalculate = () => {
    setError('');
    setResult(null);

    const dim = parseFloat(dimension);
    
    if (!dimension || isNaN(dim)) {
      setError(t('error_number'));
      return;
    }

    if (dim < 60 || dim > 100) {
      setError(t('error_range'));
      return;
    }

    // Găsesc intervalul din tabel (ultima care match-ează pentru a lua cel mai mare interval)
    const matchingRows = toleranceTable.filter((r) => dim >= r.rangeMin && dim <= r.rangeMax);
    const row = matchingRows[matchingRows.length - 1];
    if (!row) {
      setError(t('error_interval'));
      return;
    }

    // Obțin toleranța fundamentală
    const tolerance = row[precisionClass as keyof ToleranceRow];
    if (typeof tolerance !== 'number') {
      setError(t('error_precision'));
      return;
    }

    // Toleranța în micrometri
    const toleranceInMicrons = tolerance * 1000;

    // Obțin abaterile fundamentale din Tabelul 2.3 și calculez ambele valori
    const deviations = getDeviationData(dim, type, position, toleranceInMicrons);
    if (!deviations) {
      setError(t('error_position'));
      return;
    }

    // Extrag abaterile calculate
    let es: number, ei: number;
    
    if (type === 'shaft') {
      // ARBORI 
      es = deviations.es || 0;
      ei = deviations.ei || 0;
    } else {
      // ALEZAJE 
      es = deviations.ES || 0;
      ei = deviations.EI || 0;
    }

    // Calcul dimensiuni limită
    const dimensionMax = dim + (es / 1000);
    const dimensionMin = dim + (ei / 1000);
    const calculatedTolerance = Math.abs(es - ei) / 1000;

    setResult({
      dimension: dim,
      range: row.range,
      type: type,
      position: position,
      positionLabel: position,
      precisionClass,
      tolerance: toleranceInMicrons.toFixed(0),
      toleranceUnit: 'µm',
      deviationUpper: es,
      deviationLower: ei,
      dimensionMax: dimensionMax.toFixed(3),
      dimensionMin: dimensionMin.toFixed(3),
      calculatedTolerance: calculatedTolerance.toFixed(3),
    });

    // Auto-scroll la rezultate
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, padding: '2rem', transition: 'background-color 0.3s ease' }}>
      <style>{`
        @media (max-width: 768px) {
          .header-container {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
          .header-title {
            width: 100%;
            margin-bottom: 1rem !important;
          }
          .header-buttons {
            gap: 0.75rem !important;
          }
        }
      `}</style>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header cu Dark Mode Toggle și Language Switch */}
        <div className="header-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
          <h1 className="header-title" style={{ fontSize: '2rem', fontWeight: 'bold', color: theme.textPrimary, marginBottom: '0' }}>
            {t('title')}
          </h1>
          <div className="header-buttons" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {/* Language Switch */}
            <button
              onClick={() => setLanguage(language === 'ro' ? 'en' : 'ro')}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: theme.bgCard,
                border: `2px solid ${theme.border}`,
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                color: theme.textPrimary,
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = theme.border)}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = theme.bgCard)}
              title={language === 'ro' ? 'Switch to English' : 'Schimbă la Română'}
            >
              {language === 'ro' ? '🇬🇧 EN' : '🇷🇴 RO'}
            </button>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: theme.bgCard,
                border: `2px solid ${theme.border}`,
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '1.5rem',
                transition: 'all 0.3s ease',
                color: theme.textPrimary,
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = theme.border)}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = theme.bgCard)}
              title={isDarkMode ? t('switchToLight') : t('switchToDark')}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>

            {/* Unit Selector */}
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as 'um' | 'mm')}
              style={{
                padding: '0.5rem 0.75rem',
                backgroundColor: theme.bgCard,
                border: `2px solid ${theme.border}`,
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                color: theme.textPrimary,
                transition: 'all 0.3s ease',
              }}
            >
              <option value="um">µm</option>
              <option value="mm">mm</option>
            </select>
          </div>
        </div>

        {/* Live Selection Display */}
        <div style={{ backgroundColor: theme.yellowBg, border: `2px solid ${theme.yellowBorder}`, borderRadius: '0.5rem', padding: '1rem', marginBottom: '1.5rem', transition: 'all 0.3s ease' }}>
          <p style={{ fontSize: '0.75rem', color: theme.yellowText, textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '0.5rem' }}>{t('selection')}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
            <div>
              <p style={{ fontSize: '0.75rem', color: theme.yellowText }}>{t('type')}</p>
              <p style={{ fontSize: '1rem', fontWeight: 'bold', color: theme.textPrimary }}>{type === 'shaft' ? t('shaft') : t('hole')}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: theme.yellowText }}>{t('position')}</p>
              <p style={{ fontSize: '1rem', fontWeight: 'bold', color: theme.textPrimary }}>{position}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: theme.yellowText }}>{t('precision')}</p>
              <p style={{ fontSize: '1rem', fontWeight: 'bold', color: theme.textPrimary }}>{precisionClass}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: theme.yellowText }}>{t('dimension')}</p>
              <p style={{ fontSize: '1rem', fontWeight: 'bold', color: theme.textPrimary }}>{dimension || '—'} mm</p>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <div style={{ backgroundColor: theme.bgCard, borderRadius: '0.5rem', boxShadow: isDarkMode ? '0 4px 6px rgba(0,0,0,0.3)' : '0 4px 6px rgba(0,0,0,0.1)', padding: '2rem', marginBottom: '2rem', transition: 'all 0.3s ease' }}>
          
          {/* Dimensiune */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: theme.textPrimary }}>
              {t('nominalDimension')}
            </label>
            <input
              type="number"
              value={dimension}
              onChange={(e) => setDimension(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCalculate()}
              placeholder="Ex: 70"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: `2px solid ${theme.border}`,
                borderRadius: '0.25rem',
                fontSize: '1rem',
                color: theme.textPrimary,
                backgroundColor: theme.inputBg,
                transition: 'all 0.3s ease',
              }}
            />
            <p style={{ fontSize: '0.75rem', color: theme.textSecondary, marginTop: '0.25rem' }}>{t('interval')}</p>
          </div>

          {/* Type */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: theme.textPrimary }}>
              {t('typeLabel').replace(':', '')}
            </label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: theme.textPrimary }}>
                <input
                  type="radio"
                  value="shaft"
                  checked={type === 'shaft'}
                  onChange={(e) => { setType(e.target.value as 'shaft' | 'hole'); setPosition('h'); }}
                />
                {t('shaft')}
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: theme.textPrimary }}>
                <input
                  type="radio"
                  value="hole"
                  checked={type === 'hole'}
                  onChange={(e) => { setType(e.target.value as 'shaft' | 'hole'); setPosition('H'); }}
                />
                {t('hole')}
              </label>
            </div>
          </div>

          {/* Position */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: theme.textPrimary }}>
              {t('positionLabel')}
            </label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: `2px solid ${theme.border}`,
                borderRadius: '0.25rem',
                fontSize: '1rem',
                backgroundColor: theme.inputBg,
                color: theme.textPrimary,
                transition: 'all 0.3s ease',
              }}
            >
              {type === 'shaft' ? (
                <>
                  <option value="a">{t('shaft_a')}</option>
                  <option value="b">{t('shaft_b')}</option>
                  <option value="c">{t('shaft_c')}</option>
                  <option value="d">{t('shaft_d')}</option>
                  <option value="e">{t('shaft_e')}</option>
                  <option value="f">{t('shaft_f')}</option>
                  <option value="g">{t('shaft_g')}</option>
                  <option value="h">{t('shaft_h')}</option>
                  <option value="js">{t('shaft_js')}</option>
                  <option value="k">{t('shaft_k')}</option>
                  <option value="m">{t('shaft_m')}</option>
                  <option value="n">{t('shaft_n')}</option>
                  <option value="p">{t('shaft_p')}</option>
                  <option value="r">{t('shaft_r')}</option>
                  <option value="s">{t('shaft_s')}</option>
                  <option value="t">{t('shaft_t')}</option>
                  <option value="u">{t('shaft_u')}</option>
                  <option value="v">{t('shaft_v')}</option>
                  <option value="x">{t('shaft_x')}</option>
                  <option value="y">{t('shaft_y')}</option>
                  <option value="z">{t('shaft_z')}</option>
                </>
              ) : (
                <>
                  <option value="A">{t('hole_A')}</option>
                  <option value="B">{t('hole_B')}</option>
                  <option value="C">{t('hole_C')}</option>
                  <option value="D">{t('hole_D')}</option>
                  <option value="E">{t('hole_E')}</option>
                  <option value="F">{t('hole_F')}</option>
                  <option value="G">{t('hole_G')}</option>
                  <option value="H">{t('hole_H')}</option>
                  <option value="JS">{t('hole_JS')}</option>
                  <option value="K">{t('hole_K')}</option>
                  <option value="M">{t('hole_M')}</option>
                  <option value="N">{t('hole_N')}</option>
                  <option value="P">{t('hole_P')}</option>
                  <option value="R">{t('hole_R')}</option>
                  <option value="S">{t('hole_S')}</option>
                  <option value="T">{t('hole_T')}</option>
                  <option value="U">{t('hole_U')}</option>
                  <option value="V">{t('hole_V')}</option>
                  <option value="X">{t('hole_X')}</option>
                  <option value="Y">{t('hole_Y')}</option>
                  <option value="Z">{t('hole_Z')}</option>
                </>
              )}
            </select>
          </div>

          {/* Precision Class */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: theme.textPrimary }}>
              {t('precisionLabel')}
            </label>
            <select
              value={precisionClass}
              onChange={(e) => setPrecisionClass(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: `2px solid ${theme.border}`,
                borderRadius: '0.25rem',
                fontSize: '1rem',
                backgroundColor: theme.inputBg,
                color: theme.textPrimary,
                transition: 'all 0.3s ease',
              }}
            >
              <option value="IT01">{t('IT01')}</option>
              <option value="IT0">{t('IT0')}</option>
              <option value="IT1">{t('IT1')}</option>
              <option value="IT2">{t('IT2')}</option>
              <option value="IT3">{t('IT3')}</option>
              <option value="IT4">{t('IT4')}</option>
              <option value="IT5">{t('IT5')}</option>
              <option value="IT6">{t('IT6')}</option>
              <option value="IT7">{t('IT7')}</option>
              <option value="IT8">{t('IT8')}</option>
              <option value="IT9">{t('IT9')}</option>
              <option value="IT10">{t('IT10')}</option>
              <option value="IT11">{t('IT11')}</option>
              <option value="IT12">{t('IT12')}</option>
              <option value="IT13">{t('IT13')}</option>
              <option value="IT14">{t('IT14')}</option>
              <option value="IT15">{t('IT15')}</option>
              <option value="IT16">{t('IT16')}</option>
              <option value="IT17">{t('IT17')}</option>
              <option value="IT18">{t('IT18')}</option>
            </select>
          </div>

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: theme.buttonBg,
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = theme.buttonHover)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = theme.buttonBg)}
          >
            {t('calculate')}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div style={{ backgroundColor: theme.errorBg, border: `1px solid ${theme.errorBorder}`, color: theme.errorText, padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem', transition: 'all 0.3s ease' }}>
            {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div ref={resultsRef}>
            {/* Results Summary Box */}
            <div style={{ backgroundColor: theme.bgCard, borderRadius: '0.5rem', boxShadow: isDarkMode ? '0 4px 6px rgba(0,0,0,0.3)' : '0 4px 6px rgba(0,0,0,0.1)', padding: '1.5rem', marginBottom: '2rem', transition: 'all 0.3s ease' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                <div>
                  <p style={{ fontSize: '0.75rem', color: theme.textSecondary, marginBottom: '0.25rem', textTransform: 'uppercase', fontWeight: 'bold' }}>{language === 'ro' ? 'Dimensiune nominală' : 'Nominal Dimension'}</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4f46e5' }}>{result.dimension} mm</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: theme.textSecondary, marginBottom: '0.25rem', textTransform: 'uppercase', fontWeight: 'bold' }}>{language === 'ro' ? 'Tip' : 'Type'}</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#059669' }}>{result.type === 'shaft' ? t('shaft') : t('hole')}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: theme.textSecondary, marginBottom: '0.25rem', textTransform: 'uppercase', fontWeight: 'bold' }}>{language === 'ro' ? 'Poziție' : 'Position'}</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#7c3aed' }}>{result.position}</p>
                </div>
              </div>
            </div>

            {/* Main Results */}
            <div style={{ backgroundColor: theme.bgCard, borderRadius: '0.5rem', boxShadow: isDarkMode ? '0 4px 6px rgba(0,0,0,0.3)' : '0 4px 6px rgba(0,0,0,0.1)', padding: '1.5rem', marginBottom: '2rem', transition: 'all 0.3s ease' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: theme.textPrimary, marginBottom: '1rem' }}>
                {t('results')}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                
                {/* Abaterile */}
                <div style={{ borderLeft: '4px solid #ef4444', paddingLeft: '1rem' }}>
                  <p style={{ fontSize: '0.875rem', color: theme.textSecondary, marginBottom: '0.25rem' }}>{t('upperDeviation')}</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ef4444' }}>{unit === 'um' ? result.deviationUpper : (result.deviationUpper/1000).toFixed(3)} {unit === 'um' ? 'µm' : 'mm'}</p>
                </div>

                <div style={{ borderLeft: '4px solid #3b82f6', paddingLeft: '1rem' }}>
                  <p style={{ fontSize: '0.875rem', color: theme.textSecondary, marginBottom: '0.25rem' }}>{t('lowerDeviation')}</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6' }}>{unit === 'um' ? result.deviationLower : (result.deviationLower/1000).toFixed(3)} {unit === 'um' ? 'µm' : 'mm'}</p>
                </div>

                {/* Toleranță */}
                <div style={{ borderLeft: '4px solid #f59e0b', paddingLeft: '1rem' }}>
                  <p style={{ fontSize: '0.875rem', color: theme.textSecondary, marginBottom: '0.25rem' }}>{t('fundamentalTolerance')} ({result.precisionClass})</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f59e0b' }}>{unit === 'um' ? result.tolerance : (parseInt(result.tolerance)/1000).toFixed(3)} {unit === 'um' ? 'µm' : 'mm'}</p>
                </div>

                {/* Toleranță calculată */}
                <div style={{ borderLeft: '4px solid #10b981', paddingLeft: '1rem' }}>
                  <p style={{ fontSize: '0.875rem', color: theme.textSecondary, marginBottom: '0.25rem' }}>{t('calculatedTolerance')}</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>{unit === 'um' ? (parseFloat(result.calculatedTolerance)*1000).toFixed(0) : result.calculatedTolerance} {unit === 'um' ? 'µm' : 'mm'}</p>
                </div>
              </div>
            </div>

            {/* Dimensions */}
            <div style={{ backgroundColor: isDarkMode ? '#1e3a1f' : '#f0fdf4', borderRadius: '0.5rem', border: `2px solid ${isDarkMode ? '#10b981' : '#10b981'}`, padding: '1.5rem', marginBottom: '2rem', transition: 'all 0.3s ease' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: theme.textPrimary, marginBottom: '1rem' }}>
                {t('dimensionLimits')}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                <div>
                  <p style={{ fontSize: '0.875rem', color: theme.textSecondary, marginBottom: '0.25rem' }}>{t('dimensionMax')}</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#10b981' }}>{unit === 'um' ? (parseFloat(result.dimensionMax)*1000).toFixed(0) : result.dimensionMax} {unit === 'um' ? 'µm' : 'mm'}</p>
                  <p style={{ fontSize: '0.75rem', color: theme.textSecondary, marginTop: '0.25rem' }}>Dn + es = {unit === 'um' ? result.dimension*1000 : result.dimension} + {unit === 'um' ? result.deviationUpper : (result.deviationUpper/1000).toFixed(3)}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', color: theme.textSecondary, marginBottom: '0.25rem' }}>{t('dimensionMin')}</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#10b981' }}>{unit === 'um' ? (parseFloat(result.dimensionMin)*1000).toFixed(0) : result.dimensionMin} {unit === 'um' ? 'µm' : 'mm'}</p>
                  <p style={{ fontSize: '0.75rem', color: theme.textSecondary, marginTop: '0.25rem' }}>Dn + ei = {unit === 'um' ? result.dimension*1000 : result.dimension} + {unit === 'um' ? result.deviationLower : (result.deviationLower/1000).toFixed(3)}</p>
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div style={{ backgroundColor: isDarkMode ? '#0c2b42' : '#dbeafe', border: `2px solid ${isDarkMode ? '#0284c7' : '#0284c7'}`, borderRadius: '0.5rem', padding: '1rem', marginTop: '2rem', borderLeft: '4px solid #0284c7', transition: 'all 0.3s ease' }}>
              <p style={{ color: isDarkMode ? '#7dd3fc' : '#0c4a6e', fontSize: '0.95rem' }}>
                <strong>{t('successMsg')}</strong><br/>
                {t('isoStandard')} <br/>
                {t('dimensionRange')} {result.range} mm
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
