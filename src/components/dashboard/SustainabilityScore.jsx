// src/components/dashboard/SustainabilityScore.jsx
import React from 'react';
import { useSustainabilityScore } from '../../hooks/useSustainabilityScore';

export const SustainabilityScore = () => {
  const { score, scoreLabel, scoreColor } = useSustainabilityScore();

  // SVG Gauge calculations
  const radius = 70;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  // Offset represents score out of 100
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="glass-panel" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      minHeight: '260px'
    }}>
      <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: '600', marginBottom: 'var(--spacing-md)', alignSelf: 'flex-start' }}>
        SUSTAINABILITY RATING
      </h3>

      <div style={{ position: 'relative', width: '160px', height: '160px', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
        {/* Gauge Background Circle */}
        <svg width="160" height="160" style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="transparent"
            stroke="var(--bg-tertiary)"
            strokeWidth={strokeWidth}
          />
          {/* Active Score Arc */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="transparent"
            stroke={scoreColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset var(--transition-slow)'
            }}
          />
        </svg>

        {/* Floating Centered Text */}
        <div style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-primary)', lineHeight: 1 }}>
            {score}
          </span>
          <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)', letterSpacing: '0.05em', marginTop: '2px' }}>
            OUT OF 100
          </span>
        </div>
      </div>

      <div style={{ marginTop: 'var(--spacing-md)', textAlign: 'center' }}>
        <span style={{
          fontSize: '1.05rem',
          fontWeight: '700',
          color: scoreColor,
          display: 'block'
        }}>
          {scoreLabel}
        </span>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px', display: 'block' }}>
          Calculated relative to global carbon thresholds.
        </span>
      </div>
    </div>
  );
};

export default SustainabilityScore;
