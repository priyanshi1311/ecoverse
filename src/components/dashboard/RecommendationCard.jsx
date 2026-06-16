// src/components/dashboard/RecommendationCard.jsx
import React from 'react';
import { ToggleLeft, ToggleRight, DollarSign, Gauge, Activity } from 'lucide-react';

export const RecommendationCard = ({
  recommendation,
  isApplied,
  onToggle
}) => {
  const {
    id,
    title,
    description,
    impact,
    difficulty,
    cost,
    category
  } = recommendation;

  // Difficulty color mapping
  const diffColors = {
    Easy: 'var(--color-success)',
    Medium: 'var(--color-warning)',
    Hard: 'var(--color-danger)'
  };

  return (
    <div 
      className={`rec-card ${isApplied ? 'applied' : ''}`}
      onClick={() => onToggle(id)}
      style={{
        cursor: 'pointer',
        userSelect: 'none',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--spacing-md)',
        padding: 'var(--spacing-md)',
        borderRadius: 'var(--radius-md)',
        background: isApplied ? 'var(--primary-glow)' : 'rgba(255, 255, 255, 0.02)',
        border: `1px solid ${isApplied ? 'rgba(76, 175, 80, 0.35)' : 'var(--glass-border)'}`,
        transition: 'all var(--transition-normal)'
      }}
    >
      {/* Checkbox Toggle Indicator */}
      <div style={{ color: isApplied ? 'var(--primary-light)' : 'var(--text-muted)', marginTop: '2px' }}>
        {isApplied ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <h4 style={{ 
          fontSize: '1rem', 
          fontWeight: '600', 
          color: isApplied ? 'var(--text-primary)' : 'var(--text-secondary)',
          margin: 0
        }}>
          {title}
        </h4>
        
        <p style={{ 
          fontSize: '0.85rem', 
          color: isApplied ? 'var(--text-secondary)' : 'var(--text-muted)',
          margin: 0
        }}>
          {description}
        </p>

        {/* Badge metadata info */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}>
          {/* Carbon Saving */}
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.75rem',
            fontWeight: '700',
            color: 'var(--primary-light)',
            background: 'var(--primary-glow)',
            padding: '2px 8px',
            borderRadius: 'var(--radius-sm)'
          }}>
            <Activity size={10} /> Save: -{impact.toFixed(1)} t/yr
          </span>

          {/* Difficulty */}
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.75rem',
            fontWeight: '500',
            color: diffColors[difficulty] || 'var(--text-secondary)',
            background: 'rgba(255,255,255,0.03)',
            padding: '2px 8px',
            borderRadius: 'var(--radius-sm)'
          }}>
            <Gauge size={10} /> {difficulty}
          </span>

          {/* Cost */}
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '2px',
            fontSize: '0.75rem',
            fontWeight: '600',
            color: 'var(--text-secondary)',
            background: 'rgba(255,255,255,0.03)',
            padding: '2px 8px',
            borderRadius: 'var(--radius-sm)'
          }}>
            <DollarSign size={10} /> {cost}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
