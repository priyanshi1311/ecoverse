// src/components/dashboard/CarbonReductionChart.jsx
import React from 'react';
import { Lightbulb, Car, Beef, ShoppingBag } from 'lucide-react';

export const CarbonReductionChart = ({ breakdown = {}, total = 0.1 }) => {
  const { energy = 0, transport = 0, diet = 0, consumption = 0 } = breakdown;
  const items = [
    { key: 'energy', label: 'Home Utilities', value: energy, icon: Lightbulb, color: 'var(--primary-light)', bg: 'var(--primary-glow)' },
    { key: 'transport', label: 'Mobility & Flights', value: transport, icon: Car, color: 'var(--secondary-light)', bg: 'rgba(0, 150, 136, 0.1)' },
    { key: 'diet', label: 'Dietary Intake', value: diet, icon: Beef, color: 'var(--accent-light)', bg: 'rgba(3, 169, 244, 0.1)' },
    { key: 'consumption', label: 'Shopping & Waste', value: consumption, icon: ShoppingBag, color: 'var(--color-warning)', bg: 'rgba(255, 152, 0, 0.1)' }
  ];

  // Calculate percentages
  const grandTotal = energy + transport + diet + consumption || 0.1;

  return (
    <div className="glass-panel" style={{ height: '100%' }}>
      <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: '600', marginBottom: 'var(--spacing-lg)' }}>
        EMISSIONS BREAKDOWN
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {items.map((item) => {
          const percentage = grandTotal > 0 ? ((item.value / grandTotal) * 100).toFixed(0) : 0;
          
          return (
            <div key={item.key} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              
              {/* Row Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: 'var(--radius-sm)',
                    background: item.bg,
                    color: item.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <item.icon size={16} />
                  </div>
                  <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>
                    {item.label}
                  </span>
                </div>
                
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                    {item.value.toFixed(1)} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>t CO₂e</span>
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginLeft: '8px', background: 'rgba(255,255,255,0.03)', padding: '2px 6px', borderRadius: '4px' }}>
                    {percentage}%
                  </span>
                </div>
              </div>

              {/* Progress Track */}
              <div style={{
                height: '8px',
                width: '100%',
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-full)',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <div style={{
                  height: '100%',
                  width: `${percentage}%`,
                  background: item.color,
                  borderRadius: 'var(--radius-full)',
                  transition: 'width var(--transition-slow)'
                }} />
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CarbonReductionChart;
