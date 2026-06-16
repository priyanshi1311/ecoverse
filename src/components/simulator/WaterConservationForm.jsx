// src/components/simulator/WaterConservationForm.jsx
import React from 'react';
import { Droplet } from 'lucide-react';
import factors from '../../data/emissionFactors.json';

export const WaterConservationForm = ({ value, onChange }) => {
  const annualLitersSaved = value * 365;
  const annualOffsetTonnes = annualLitersSaved * Math.abs(factors.offsets.water_liter_saved);

  return (
    <div className="simulator-form-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>
        <Droplet size={18} style={{ color: 'var(--secondary-light)' }} />
        <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '600' }}>Water Conservation</h4>
      </div>

      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
        Conserving tap water reduces electricity used in municipal purification and pumping.
      </p>

      <div className="range-slider-group">
        <div className="range-slider-header">
          <span>Water Saved</span>
          <span className="range-slider-value">{value} L / day</span>
        </div>
        <input
          type="range"
          min="0"
          max="500"
          step="10"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="custom-range"
        />
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(255,255,255,0.02)',
        padding: '8px 12px',
        borderRadius: 'var(--radius-sm)',
        fontSize: '0.85rem'
      }}>
        <span style={{ color: 'var(--text-secondary)' }}>Projected Offset:</span>
        <strong style={{ color: 'var(--primary-light)' }}>-{annualOffsetTonnes.toFixed(4)} t CO₂e / yr</strong>
      </div>
    </div>
  );
};

export default WaterConservationForm;
