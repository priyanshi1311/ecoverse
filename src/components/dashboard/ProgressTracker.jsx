// src/components/dashboard/ProgressTracker.jsx
import React from 'react';
import { Target, Smile, AlertTriangle } from 'lucide-react';

export const ProgressTracker = ({ currentFootprint = 10, simulatedFootprint = 8, targetGoal = 2.0 }) => {
  const isGoalAchieved = simulatedFootprint <= targetGoal;
  
  // Calculate relative progress towards goal
  const initialGap = Math.max(0.1, currentFootprint - targetGoal);
  const currentGap = Math.max(0, simulatedFootprint - targetGoal);
  const reductionMade = Math.max(0, currentFootprint - simulatedFootprint);
  
  const progressPercent = Math.min(100, Math.max(0, Math.round((reductionMade / initialGap) * 100)));

  return (
    <div className="glass-panel" style={{ height: '100%' }}>
      <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: '600', marginBottom: 'var(--spacing-md)' }}>
        CLIMATE TARGET TRACKER
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* Progress header info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Goal: Reach <strong>{targetGoal.toFixed(1)} t/yr</strong>
          </span>
          <span style={{ 
            fontSize: '0.95rem', 
            fontWeight: '700', 
            color: isGoalAchieved ? 'var(--color-success)' : 'var(--primary-light)'
          }}>
            {progressPercent}% Achieved
          </span>
        </div>

        {/* Progress Bar Container */}
        <div style={{
          height: '14px',
          width: '100%',
          background: 'var(--bg-tertiary)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
          position: 'relative',
          border: '1px solid var(--glass-border)'
        }}>
          <div style={{
            height: '100%',
            width: `${progressPercent}%`,
            background: `linear-gradient(90deg, var(--primary), ${isGoalAchieved ? 'var(--color-success)' : 'var(--secondary-light)'})`,
            borderRadius: 'var(--radius-full)',
            transition: 'width var(--transition-slow)'
          }} />
        </div>

        {/* Status Callout Banner */}
        {isGoalAchieved ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'var(--primary-glow)',
            border: '1px solid rgba(76, 175, 80, 0.25)',
            borderRadius: 'var(--radius-md)',
            padding: '12px'
          }}>
            <Smile size={18} style={{ color: 'var(--color-success)' }} />
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <strong>Excellent job!</strong> Your simulated actions successfully bring your carbon footprint below the sustainable limit.
            </div>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            background: 'rgba(255, 152, 0, 0.08)',
            border: '1px solid rgba(255, 152, 0, 0.2)',
            borderRadius: 'var(--radius-md)',
            padding: '12px'
          }}>
            <AlertTriangle size={18} style={{ color: 'var(--color-warning)', flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <strong>Target Gap:</strong> You need to reduce emissions by another <strong>{currentGap.toFixed(1)} tonnes/yr</strong> to meet the climate goal. Apply more simulator recommendations!
            </div>
          </div>
        )}

        {/* Legend milestones */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid var(--glass-border)', paddingTop: '12px' }}>
          <div>
            <span>Start</span>
            <div style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>{currentFootprint.toFixed(1)} t</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span>Current Sim</span>
            <div style={{ fontWeight: '600', color: 'var(--primary-light)' }}>{simulatedFootprint.toFixed(1)} t</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span>Climate Cap</span>
            <div style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>{targetGoal.toFixed(1)} t</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProgressTracker;
