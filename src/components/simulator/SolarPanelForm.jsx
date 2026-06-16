// src/components/simulator/SolarPanelForm.jsx
import React from 'react';
import { Sun } from 'lucide-react';

export const SolarPanelForm = ({ value, onChange }) => {
  const annualOffsetTonnes = value * 1.10; // 1.1 tonnes CO2 per kW per year

  return (
    <div className="simulator-form-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>
        <Sun size={18} style={{ color: 'var(--color-warning)' }} />
        <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '600' }}>Rooftop Solar Panels</h4>
      </div>

      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
        Generating solar electricity displaces fossil-fuel generated power from the utility grid.
      </p>

      <div className="range-slider-group">
        <div className="range-slider-header">
          <span>System Capacity</span>
          <span className="range-slider-value">{value} kW</span>
        </div>
        <input
          type="range"
          min="0"
          max="15"
          step="0.5"
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
        <strong style={{ color: 'var(--primary-light)' }}>-{annualOffsetTonnes.toFixed(2)} t CO₂e / yr</strong>
      </div>
    </div>
  );
};

export default SolarPanelForm;
