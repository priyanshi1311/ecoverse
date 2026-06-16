// src/components/ai/ImpactPrediction.jsx
import React from 'react';
import { useSimulation } from '../../hooks/useSimulation';

export const ImpactPrediction = () => {
  const { trajectory } = useSimulation();

  // SVG dimensions
  const width = 500;
  const height = 250;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  // Find bounds for scaling
  // All curves represent carbon footprint in tonnes. Max is usually BAU max (e.g. 20-30), Min is 0.
  const allValues = trajectory.flatMap(d => [d.bau, d.simulated, d.target]);
  const maxValue = Math.max(...allValues, 10);
  const yMax = Math.ceil(maxValue / 5) * 5; // round to nearest multiple of 5

  const pointsCount = trajectory.length;
  
  // Coordinate transformers
  const getX = (index) => {
    return paddingLeft + (index * (width - paddingLeft - paddingRight)) / (pointsCount - 1);
  };
  
  const getY = (value) => {
    return height - paddingBottom - (value * (height - paddingTop - paddingBottom)) / yMax;
  };

  // Build SVG path strings
  const getPathD = (key) => {
    return trajectory.map((d, idx) => {
      const x = getX(idx);
      const y = getY(d[key]);
      return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  const bauPath = getPathD('bau');
  const simPath = getPathD('simulated');
  const targetPath = getPathD('target');

  // Y-axis tick marks
  const yTicks = [];
  for (let i = 0; i <= yMax; i += Math.max(1, Math.round(yMax / 5))) {
    yTicks.push(i);
  }

  return (
    <div className="glass-panel" style={{ height: '100%' }}>
      <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: '600', marginBottom: 'var(--spacing-md)' }}>
        5-YEAR EMISSIONS PREDICTION
      </h3>
      
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 'var(--spacing-md)' }}>
        Comparing Business-As-Usual (BAU), your Active simulated changes, and Paris Accord Climate Target.
      </p>

      {/* Responsive Chart Wrapper */}
      <div style={{ width: '100%', overflowX: 'auto', display: 'flex', justifyContent: 'center' }}>
        <svg viewBox={`0 0 ${width} ${height}`} width="100%" maxWidth="500" height={height} style={{ overflow: 'visible' }}>
          
          {/* Y-Axis Grid Lines */}
          {yTicks.map((tick, idx) => {
            const y = getY(tick);
            return (
              <g key={idx}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeWidth="1"
                  strokeDasharray={tick === 0 ? 'none' : '4 4'}
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 4}
                  fill="var(--text-muted)"
                  fontSize="10"
                  textAnchor="end"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* X-Axis labels (Years) */}
          {trajectory.map((d, idx) => {
            const x = getX(idx);
            return (
              <text
                key={idx}
                x={x}
                y={height - 10}
                fill="var(--text-muted)"
                fontSize="10"
                textAnchor="middle"
              >
                {d.year}
              </text>
            );
          })}

          {/* Trajectory Paths */}
          
          {/* Business-As-Usual (BAU) - Red */}
          <path
            d={bauPath}
            fill="none"
            stroke="var(--color-danger)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.8"
            style={{ transition: 'd var(--transition-slow)' }}
          />

          {/* Climate target - Blue/Teal */}
          <path
            d={targetPath}
            fill="none"
            stroke="var(--accent-light)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="5 5"
            opacity="0.6"
            style={{ transition: 'd var(--transition-slow)' }}
          />

          {/* Active simulated path - Glowing Green */}
          <path
            d={simPath}
            fill="none"
            stroke="var(--primary-light)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              filter: 'drop-shadow(0px 0px 4px rgba(34, 197, 94, 0.4))',
              transition: 'd var(--transition-slow)'
            }}
          />

          {/* Data Points on Simulated Path */}
          {trajectory.map((d, idx) => {
            const x = getX(idx);
            const y = getY(d.simulated);
            return (
              <circle
                key={idx}
                cx={x}
                cy={y}
                r="4"
                fill="var(--primary-light)"
                stroke="var(--bg-primary)"
                strokeWidth="2"
                style={{ transition: 'cy var(--transition-slow)' }}
              />
            );
          })}
        </svg>
      </div>

      {/* Legends */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '16px',
        flexWrap: 'wrap',
        fontSize: '0.8rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '12px', height: '3px', background: 'var(--color-danger)', borderRadius: '2px' }} />
          <span style={{ color: 'var(--text-secondary)' }}>Business-As-Usual</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '12px', height: '3px', background: 'var(--primary-light)', borderRadius: '2px' }} />
          <span style={{ color: 'var(--text-secondary)' }}>Simulated Path</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '12px', height: '3px', borderTop: '3px dashed var(--accent-light)' }} />
          <span style={{ color: 'var(--text-secondary)' }}>Climate target (2.0t)</span>
        </div>
      </div>
    </div>
  );
};

export default ImpactPrediction;
