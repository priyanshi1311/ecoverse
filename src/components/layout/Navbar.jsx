// src/components/layout/Navbar.jsx
import React, { useContext } from 'react';
import { Leaf, Award, RotateCcw } from 'lucide-react';
import { UserContext } from '../../context/UserContext';
import { useSustainabilityScore } from '../../hooks/useSustainabilityScore';
import Button from '../common/Button';

export const Navbar = () => {
  const { hasCompletedWizard, resetUser } = useContext(UserContext);
  const { score, scoreLabel, scoreColor, footprint } = useSustainabilityScore();

  return (
    <header style={{
      height: '70px',
      position: 'sticky',
      top: 0,
      background: 'rgba(10, 11, 14, 0.5)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--glass-border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 var(--spacing-xl)',
      zIndex: 99,
      width: '100%'
    }}>
      
      {/* Brand Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '38px',
          height: '38px',
          background: 'var(--primary-glow)',
          border: '1px solid rgba(76, 175, 80, 0.3)',
          borderRadius: 'var(--radius-md)'
        }}>
          <Leaf size={20} style={{ color: 'var(--primary-light)' }} />
        </div>
        <span style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '0.05em' }}>
          ECO<span className="text-gradient">VERSE</span>
        </span>
      </div>

      {/* Profile/Score info if wizard is completed */}
      {hasCompletedWizard ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Active Score Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)'
          }}>
            <Award size={16} style={{ color: scoreColor }} />
            <span style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
              Eco Score:
            </span>
            <span style={{ fontSize: '0.95rem', fontWeight: '800', color: scoreColor }}>
              {score}/100
            </span>
          </div>

          {/* Quick footprint metric */}
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'none' }}>
            <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{footprint}</span> t CO₂e/yr
          </div>

          {/* Reset profile button */}
          <Button 
            variant="glass" 
            size="sm" 
            onClick={resetUser}
            icon={RotateCcw}
          >
            Reset
          </Button>
        </div>
      ) : (
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '500' }}>
          Eco Onboarding Active
        </div>
      )}
    </header>
  );
};

export default Navbar;
