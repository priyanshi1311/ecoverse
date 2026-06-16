// src/components/ai/ScenarioComparison.jsx
import React from 'react';
import { sampleScenarios } from '../../data/sampleScenarios';
import { useSustainabilityScore } from '../../hooks/useSustainabilityScore';

export const ScenarioComparison = () => {
  const { footprint } = useSustainabilityScore();

  // Combine user footprint with sample scenarios
  const allScenarios = [
    ...sampleScenarios.map(s => ({
      name: s.name,
      value: s.calculatedFootprint,
      isUser: false,
      desc: s.description
    })),
    {
      name: "Your Carbon Footprint",
      value: footprint,
      isUser: true,
      desc: "Based on your onboarding responses."
    }
  ];

  // Sort by footprint value (lowest to highest)
  const sortedScenarios = [...allScenarios].sort((a, b) => a.value - b.value);

  // Find max value to normalize widths
  const maxFootprint = Math.max(...sortedScenarios.map(s => s.value), 20);

  return (
    <div className="glass-panel" style={{ height: '100%' }}>
      <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: '600', marginBottom: 'var(--spacing-lg)' }}>
        HOW YOU COMPARE
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {sortedScenarios.map((scen, idx) => {
          const widthPercent = (scen.value / maxFootprint) * 100;
          
          return (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ 
                    fontSize: '0.9rem', 
                    fontWeight: scen.isUser ? '700' : '500',
                    color: scen.isUser ? 'var(--primary-light)' : 'var(--text-primary)'
                  }}>
                    {scen.name} {scen.isUser && "⭐"}
                  </span>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {scen.desc}
                  </span>
                </div>
                
                <span style={{ 
                  fontSize: '0.95rem', 
                  fontWeight: '700', 
                  color: scen.isUser ? 'var(--primary-light)' : 'var(--text-secondary)'
                }}>
                  {scen.value.toFixed(2)} <span style={{ fontSize: '0.75rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>t/yr</span>
                </span>
              </div>

              {/* Bar */}
              <div style={{
                height: '10px',
                width: '100%',
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-full)',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${widthPercent}%`,
                  background: scen.isUser 
                    ? 'linear-gradient(90deg, var(--primary), var(--primary-light))' 
                    : 'var(--text-muted)',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: scen.isUser ? '0 0 10px var(--primary-glow)' : 'none',
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

export default ScenarioComparison;
