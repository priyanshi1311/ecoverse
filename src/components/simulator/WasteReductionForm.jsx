// src/components/simulator/WasteReductionForm.jsx
import React from 'react';
import { Trash2 } from 'lucide-react';

export const WasteReductionForm = ({ value, onChange }) => {
  const annualOffsetKg = value * 52; // annualized reduced kg
  const annualOffsetTonnes = annualOffsetKg * 0.001; // offset calculation

  return (
    <div className="simulator-form-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>
        <Trash2 size={18} style={{ color: 'var(--color-danger)' }} />
        <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '600' }}>Waste Reduction & Composting</h4>
      </div>

      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
        Reducing waste and composting organics prevents landfill methane release.
      </p>

      <div className="range-slider-group">
        <div className="range-slider-header">
          <span>Waste Diverted</span>
          <span className="range-slider-value">{value} kg / week</span>
        </div>
        <input
          type="range"
          min="0"
          max="30"
          step="1"
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
        <strong style={{ color: 'var(--primary-light)' }}>-{annualOffsetTonnes.toFixed(3)} t CO₂e / yr</strong>
      </div>
    </div>
  );
};

export default WasteReductionForm;
