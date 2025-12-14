import { useState } from 'react';
import { getDeviationData, toleranceTable } from '../data/isoData';
import type { ToleranceRow } from '../data/isoData';

export default function ToleranceCalculator() {
  const [dimension, setDimension] = useState('');
  const [type, setType] = useState<'shaft' | 'hole'>('shaft');
  const [position, setPosition] = useState('h');
  const [precisionClass, setPrecisionClass] = useState('IT6');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  // Opțiuni disponibile pentru poziții și IT
  const shaftPositions = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'js', 'k', 'm', 'n', 'p', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z'];
  const holePositions = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'JS', 'K', 'M', 'N', 'P', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z'];
  const itClasses = ['IT01', 'IT0', 'IT1', 'IT2', 'IT3', 'IT4', 'IT5', 'IT6', 'IT7', 'IT8', 'IT9', 'IT10', 'IT11', 'IT12', 'IT13', 'IT14', 'IT15', 'IT16', 'IT17', 'IT18'];

  const handleCalculate = () => {
    setError('');
    setResult(null);

    const dim = parseFloat(dimension);
    
    if (!dimension || isNaN(dim)) {
      setError('❌ Introduceți o valoare numerică');
      return;
    }

    if (dim < 60 || dim > 100) {
      setError('❌ Dimensiunea trebuie să fie între 60 și 100 mm');
      return;
    }

    // Găsesc intervalul din tabel
    const row = toleranceTable.find((r) => dim >= r.rangeMin && dim <= r.rangeMax);
    if (!row) {
      setError('❌ Nu s-a găsit interval pentru această dimensiune');
      return;
    }

    // Obțin toleranța fundamentală
    const tolerance = row[precisionClass as keyof ToleranceRow];
    if (typeof tolerance !== 'number') {
      setError('❌ Treapta de precizie selectată nu este disponibilă');
      return;
    }

    // Toleranța în micrometri
    const toleranceInMicrons = tolerance * 1000;

    // Obțin abaterile fundamentale din Tabelul 2.3 și calculez ambele valori
    const deviations = getDeviationData(dim, type, position, toleranceInMicrons);
    if (!deviations) {
      setError('❌ Poziția toleranței selectată nu este disponibilă');
      return;
    }

    // Extrag abaterile calculate
    let es: number, ei: number;
    
    if (type === 'shaft') {
      // ARBORI - extraiu es și ei
      es = deviations.es || 0;
      ei = deviations.ei || 0;
    } else {
      // ALEZAJE - extraiu ES și EI (notația cu majuscule)
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
      typeLabel: type === 'shaft' ? '🔧 Arbore' : '⭕ Alezaj',
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
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f9ff', padding: '2rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '0.5rem' }}>
            📊 Calculator Toleranțe Dimensionale
          </h1>
        </div>

        {/* Live Selection Display */}
        <div style={{ backgroundColor: '#fef3c7', border: '2px solid #f59e0b', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1.5rem' }}>
          <p style={{ fontSize: '0.75rem', color: '#92400e', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '0.5rem' }}>Selecția ta:</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem' }}>
            <div>
              <p style={{ fontSize: '0.75rem', color: '#b45309' }}>Tip</p>
              <p style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1e293b' }}>{type === 'shaft' ? '🔧 Arbore' : '⭕ Alezaj'}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: '#b45309' }}>Poziție</p>
              <p style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1e293b' }}>{position}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: '#b45309' }}>Precizie</p>
              <p style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1e293b' }}>{precisionClass}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: '#b45309' }}>Dimensiune</p>
              <p style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1e293b' }}>{dimension || '—'} mm</p>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '2rem', marginBottom: '2rem' }}>
          
          {/* Dimensiune */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#1e293b' }}>
              📏 Dimensiune nominală (mm):
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
                border: '2px solid #cbd5e1',
                borderRadius: '0.25rem',
                fontSize: '1rem',
                color: '#1e293b',
                backgroundColor: '#ffffff',
              }}
            />
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>Interval: 60 - 100 mm</p>
          </div>

          {/* Type */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#1e293b' }}>
              🔧 Tip:
            </label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  value="shaft"
                  checked={type === 'shaft'}
                  onChange={(e) => { setType(e.target.value as 'shaft' | 'hole'); setPosition('h'); }}
                />
                Arbore
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  value="hole"
                  checked={type === 'hole'}
                  onChange={(e) => { setType(e.target.value as 'shaft' | 'hole'); setPosition('H'); }}
                />
                Alezaj
              </label>
            </div>
          </div>

          {/* Position */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#1e293b' }}>
              📍 Poziția toleranței:
            </label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #cbd5e1',
                borderRadius: '0.25rem',
                fontSize: '1rem',
                backgroundColor: '#ffffff',
                color: '#1e293b',
              }}
            >
              {type === 'shaft' ? (
                <>
                  <option value="a">a - Abatere negativă mare</option>
                  <option value="b">b - Abatere negativă</option>
                  <option value="c">c - Abatere negativă</option>
                  <option value="d">d - Abatere negativă mică</option>
                  <option value="e">e - Abatere negativă foarte mică</option>
                  <option value="f">f - Abatere negativă foarte mică</option>
                  <option value="g">g - Abatere negativă minimă</option>
                  <option value="h">h - Bază (fără abatere)</option>
                  <option value="js">js - Abatere simetrică</option>
                  <option value="k">k - Abatere pozitivă mică</option>
                  <option value="m">m - Abatere pozitivă</option>
                  <option value="n">n - Abatere pozitivă</option>
                  <option value="p">p - Abatere pozitivă mare</option>
                  <option value="r">r - Abatere pozitivă mare</option>
                  <option value="s">s - Abatere pozitivă</option>
                  <option value="t">t - Abatere pozitivă foarte mare</option>
                  <option value="u">u - Abatere pozitivă foarte mare</option>
                  <option value="v">v - Abatere pozitivă foarte mare</option>
                  <option value="x">x - Abatere pozitivă maximă</option>
                  <option value="y">y - Abatere pozitivă maximă</option>
                  <option value="z">z - Abatere pozitivă maximă</option>
                </>
              ) : (
                <>
                  <option value="A">A - Abatere pozitivă mare</option>
                  <option value="B">B - Abatere pozitivă</option>
                  <option value="C">C - Abatere pozitivă</option>
                  <option value="D">D - Abatere pozitivă mică</option>
                  <option value="E">E - Abatere pozitivă foarte mică</option>
                  <option value="F">F - Abatere pozitivă foarte mică</option>
                  <option value="G">G - Abatere pozitivă minimă</option>
                  <option value="H">H - Bază (fără abatere)</option>
                  <option value="JS">JS - Abatere simetrică</option>
                  <option value="K">K - Abatere negativă mică</option>
                  <option value="M">M - Abatere negativă</option>
                  <option value="N">N - Abatere negativă</option>
                  <option value="P">P - Abatere negativă mare</option>
                  <option value="R">R - Abatere negativă mare</option>
                  <option value="S">S - Abatere negativă</option>
                  <option value="T">T - Abatere negativă foarte mare</option>
                  <option value="U">U - Abatere negativă foarte mare</option>
                  <option value="V">V - Abatere negativă foarte mare</option>
                  <option value="X">X - Abatere negativă maximă</option>
                  <option value="Y">Y - Abatere negativă maximă</option>
                  <option value="Z">Z - Abatere negativă maximă</option>
                </>
              )}
            </select>
          </div>

          {/* Precision Class */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#1e293b' }}>
              ⚙️ Treapta de precizie:
            </label>
            <select
              value={precisionClass}
              onChange={(e) => setPrecisionClass(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #cbd5e1',
                borderRadius: '0.25rem',
                fontSize: '1rem',
                backgroundColor: '#ffffff',
                color: '#1e293b',
              }}
            >
              <option value="IT01">IT01 - Precizie foarte fină</option>
              <option value="IT0">IT0 - Precizie extrafină</option>
              <option value="IT1">IT1 - Precizie foarte fină</option>
              <option value="IT2">IT2 - Precizie foarte fină</option>
              <option value="IT3">IT3 - Precizie fină</option>
              <option value="IT4">IT4 - Precizie fină</option>
              <option value="IT5">IT5 - Precizie fină</option>
              <option value="IT6">IT6 - Precizie normală</option>
              <option value="IT7">IT7 - Precizie normală</option>
              <option value="IT8">IT8 - Precizie grosieră</option>
              <option value="IT9">IT9 - Precizie grosieră</option>
              <option value="IT10">IT10 - Precizie foarte grosieră</option>
              <option value="IT11">IT11 - Precizie foarte grosieră</option>
              <option value="IT12">IT12 - Precizie foarte grosieră</option>
              <option value="IT13">IT13 - Precizie foarte grosieră</option>
              <option value="IT14">IT14 - Precizie foarte grosieră</option>
              <option value="IT15">IT15 - Precizie foarte grosieră</option>
              <option value="IT16">IT16 - Precizie foarte grosieră</option>
              <option value="IT17">IT17 - Precizie foarte grosieră</option>
              <option value="IT18">IT18 - Precizie foarte grosieră</option>
            </select>
          </div>

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#4338ca')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#4f46e5')}
          >
            ✓ Calculează
          </button>
        </div>

        {/* Error */}
        {error && (
          <div style={{ backgroundColor: '#fee2e2', border: '1px solid #fecaca', color: '#991b1b', padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
            {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div>
            {/* Results Summary Box */}
            <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem', textTransform: 'uppercase', fontWeight: 'bold' }}>Dimensiune nominală</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4f46e5' }}>{result.dimension} mm</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem', textTransform: 'uppercase', fontWeight: 'bold' }}>Tip</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#059669' }}>{result.typeLabel}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem', textTransform: 'uppercase', fontWeight: 'bold' }}>Poziție</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#7c3aed' }}>{result.position}</p>
                </div>
              </div>
            </div>

            {/* Main Results */}
            <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '1.5rem', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '1rem' }}>
                📊 Rezultate
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                
                {/* Abaterile */}
                <div style={{ borderLeft: '4px solid #ef4444', paddingLeft: '1rem' }}>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>Abatere superioară (ES/es)</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ef4444' }}>{result.deviationUpper} µm</p>
                </div>

                <div style={{ borderLeft: '4px solid #3b82f6', paddingLeft: '1rem' }}>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>Abatere inferioară (EI/ei)</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6' }}>{result.deviationLower} µm</p>
                </div>

                {/* Toleranță */}
                <div style={{ borderLeft: '4px solid #f59e0b', paddingLeft: '1rem' }}>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>Toleranță fundamentală ({result.precisionClass})</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f59e0b' }}>{result.tolerance} {result.toleranceUnit}</p>
                </div>

                {/* Toleranță calculată */}
                <div style={{ borderLeft: '4px solid #10b981', paddingLeft: '1rem' }}>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>Toleranță (calculată)</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>{result.calculatedTolerance} mm</p>
                </div>
              </div>
            </div>

            {/* Dimensions */}
            <div style={{ backgroundColor: '#f0fdf4', borderRadius: '0.5rem', border: '2px solid #10b981', padding: '1.5rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '1rem' }}>
                📐 Dimensiuni limită
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>Dimensiune maximă</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#10b981' }}>{result.dimensionMax} mm</p>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>Dn + es = {result.dimension} + {(result.deviationUpper/1000).toFixed(3)}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>Dimensiune minimă</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#10b981' }}>{result.dimensionMin} mm</p>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>Dn + ei = {result.dimension} + {(result.deviationLower/1000).toFixed(3)}</p>
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div style={{ backgroundColor: '#dbeafe', border: '2px solid #0284c7', borderRadius: '0.5rem', padding: '1rem', marginTop: '2rem', borderLeft: '4px solid #0284c7' }}>
              <p style={{ color: '#0c4a6e', fontSize: '0.95rem' }}>
                <strong>✅ Calculul s-a realizat cu succes!</strong><br/>
                Valorile afișate sunt conform standardului ISO 286-1. <br/>
                Interval de dimensiuni: {result.range} mm
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
