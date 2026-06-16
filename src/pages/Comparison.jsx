// src/pages/Comparison.jsx
import React, { useContext } from 'react';
import { sampleScenarios } from '../data/sampleScenarios';
import { useSustainabilityScore } from '../hooks/useSustainabilityScore';
import { UserContext } from '../context/UserContext';
import { Leaf, Users, Car, Zap, Apple } from 'lucide-react';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';

export const Comparison = () => {
  const { footprint, breakdown, regionalComparison } = useSustainabilityScore();
  const { hasCompletedWizard } = useContext(UserContext);
  const navigate = useNavigate();

  if (!hasCompletedWizard) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <div className="glass-panel" style={{ maxWidth: '500px', margin: '0 auto', padding: 'var(--spacing-xl)', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          <Leaf size={48} style={{ color: 'var(--primary-light)', animation: 'loader-pulse 1.5s infinite' }} />
          <h2>Comparison Locked</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Complete the onboarding wizard to unlock footprint comparative analytics.
          </p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Start Wizard
          </Button>
        </div>
      </div>
    );
  }

  // User Profile Row
  const userScen = {
    name: "Your Carbon Footprint",
    description: "Based on your current onboarding questionnaire.",
    breakdown,
    total: footprint
  };

  // Preset Scenario Data List
  const presetScenarios = sampleScenarios.map(s => {
    // We already have approximate calculatedFootprint in sampleScenarios
    // Let's create an approximate breakdown for display
    const tot = s.calculatedFootprint;
    return {
      name: s.name,
      description: s.description,
      total: tot,
      breakdown: {
        energy: Number((tot * 0.35).toFixed(1)),
        transport: Number((tot * 0.40).toFixed(1)),
        diet: Number((tot * 0.15).toFixed(1)),
        consumption: Number((tot * 0.10).toFixed(1))
      }
    };
  });

  const allScenarios = [userScen, ...presetScenarios];

  return (
    <div className="page-container">
      <div style={{ marginBottom: 'var(--spacing-lg)' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>
          Scenario <span className="text-gradient">Comparisons</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Compare your footprint breakdown side-by-side with common societal archetypes.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-lg)', marginTop: '20px' }}>
        {allScenarios.map((scen, idx) => {
          const isUser = idx === 0;
          return (
            <div 
              key={idx} 
              className="glass-panel" 
              style={{ 
                border: isUser ? '2px solid var(--primary-light)' : '1px solid var(--glass-border)',
                boxShadow: isUser ? 'var(--shadow-glow)' : 'var(--glass-shadow)',
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                padding: 'var(--spacing-lg)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h3 style={{ 
                    fontSize: '1.15rem', 
                    fontWeight: '800', 
                    color: isUser ? 'var(--primary-light)' : 'var(--text-primary)'
                  }}>
                    {scen.name}
                  </h3>
                  {isUser && <span style={{ fontSize: '0.75rem', background: 'var(--primary-glow)', color: 'var(--primary-light)', padding: '2px 8px', borderRadius: 'var(--radius-sm)', fontWeight: '700' }}>ACTIVE</span>}
                </div>

                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 'var(--spacing-md)', minHeight: '36px' }}>
                  {scen.description}
                </p>

                {/* Score */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', margin: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
                  <span style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--text-primary)' }}>{scen.total.toFixed(2)}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>t CO₂e/yr</span>
                </div>

                {/* Breakdown List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                    <span>Home Utilities:</span>
                    <strong>{scen.breakdown.energy} t</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                    <span>Mobility & Air:</span>
                    <strong>{scen.breakdown.transport} t</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                    <span>Diet Footprint:</span>
                    <strong>{scen.breakdown.diet} t</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                    <span>Shopping / Waste:</span>
                    <strong>{scen.breakdown.consumption} t</strong>
                  </div>
                </div>
              </div>

              {/* Offset comparative rating */}
              <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {scen.total <= 2.0 ? (
                  <span style={{ color: 'var(--color-success)', fontWeight: '600' }}>✓ Sustainable (Paris Goal Achieved)</span>
                ) : (
                  <span>⚠ Exceeds global target of 2.0t</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comparison;
