// src/components/dashboard/ImpactSummaryCard.jsx
import React from 'react';
import { ShieldCheck, TrendingDown, HelpCircle } from 'lucide-react';
import { useSustainabilityScore } from '../../hooks/useSustainabilityScore';

export const ImpactSummaryCard = ({ simulatedSavings = 0, isSimulated = false, simulatedTotal = 0 }) => {
  const { footprint, regionalComparison } = useSustainabilityScore();

  const displayedFootprint = isSimulated ? simulatedTotal : footprint;
  const differenceFromAverage = isSimulated 
    ? simulatedTotal - regionalComparison.regionalAverage 
    : regionalComparison.difference;

  const percentDiff = Math.abs((differenceFromAverage / regionalComparison.regionalAverage) * 100).toFixed(0);
  const isHigher = differenceFromAverage > 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
      {/* 1. Footprint Card */}
      <div className="glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-sm)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
            {isSimulated ? "SIMULATED CARBON FOOTPRINT" : "ANNUAL CARBON FOOTPRINT"}
          </span>
          <ShieldCheck size={16} style={{ color: isSimulated ? 'var(--secondary-light)' : 'var(--primary-light)' }} />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          <span style={{ fontSize: '2.8rem', fontWeight: '800', color: 'var(--text-primary)', lineHeight: 1 }}>
            {displayedFootprint.toFixed(2)}
          </span>
          <span style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-muted)' }}>
            tonnes CO₂e / yr
          </span>
        </div>
        
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px' }}>
          {isSimulated 
            ? "Your projected footprint if all checked simulator adjustments are implemented." 
            : "Your current calculated carbon footprint based on your profile inputs."}
        </p>
      </div>

      {/* 2. Comparison Metrics Card */}
      <div className="glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-sm)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
            REGIONAL BENCHMARK COMP
          </span>
          <TrendingDown size={16} style={{ color: isHigher ? 'var(--color-danger)' : 'var(--color-success)' }} />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          <span style={{ 
            fontSize: '1.8rem', 
            fontWeight: '800', 
            color: isHigher ? 'var(--color-danger)' : 'var(--color-success)'
          }}>
            {percentDiff}% {isHigher ? 'Higher' : 'Lower'}
          </span>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            than average
          </span>
        </div>
        
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px' }}>
          Compared to the {regionalComparison.regionName} baseline average of <strong>{regionalComparison.regionalAverage.toFixed(1)} tonnes</strong>.
        </p>
      </div>
    </div>
  );
};

export default ImpactSummaryCard;
