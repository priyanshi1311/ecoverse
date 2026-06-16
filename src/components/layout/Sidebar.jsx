// src/components/layout/Sidebar.jsx
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  BarChart3, 
  Leaf, 
  GitCompare, 
  Info,
  ChevronRight,
  Menu
} from 'lucide-react';
import { UserContext } from '../../context/UserContext';

export const Sidebar = () => {
  const { hasCompletedWizard } = useContext(UserContext);

  const navItems = [
    { path: '/', label: 'Home / Wizard', icon: Home, reqWizard: false },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3, reqWizard: true },
    { path: '/simulator', label: 'Eco Simulator', icon: Leaf, reqWizard: true },
    { path: '/comparison', label: 'Scenarios', icon: GitCompare, reqWizard: true },
    { path: '/about', label: 'About EcoVerse', icon: Info, reqWizard: false },
  ];

  return (
    <aside style={{
      width: '260px',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--glass-border)',
      padding: 'var(--spacing-xl) var(--spacing-md)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      zIndex: 100,
      overflowY: 'auto'
    }} className="sidebar-container">
      
      {/* Brand & Menu */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '10px' }}>
          <Menu size={20} style={{ color: 'var(--text-secondary)' }} />
          <span style={{ fontWeight: '700', color: 'var(--text-muted)', fontSize: '0.85rem', letterSpacing: '0.1em', uppercase: 'true' }}>
            NAVIGATION
          </span>
        </div>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {navItems.map((item) => {
            const isDisabled = item.reqWizard && !hasCompletedWizard;
            
            return (
              <NavLink
                key={item.path}
                to={isDisabled ? '#' : item.path}
                className={({ isActive }) => `sidebar-link ${isActive && !isDisabled ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  color: isDisabled ? 'var(--text-muted)' : 'var(--text-secondary)',
                  fontWeight: '500',
                  fontSize: '0.95rem',
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  transition: 'all var(--transition-fast)',
                  background: 'transparent'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </div>
                {isDisabled ? (
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.03)', padding: '2px 6px', borderRadius: '4px' }}>Locked</span>
                ) : (
                  <ChevronRight size={14} className="chevron-icon" style={{ opacity: 0, transition: 'opacity var(--transition-fast)' }} />
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* System Footer info */}
      <div style={{ padding: '0 10px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-success)', display: 'inline-block' }} />
          <span>Local Engine Active</span>
        </div>
        <span>v1.2.0-client</span>
      </div>
    </aside>
  );
};

// Add standard active & disabled hover classes for sidebar links
if (typeof document !== 'undefined') {
  const styleId = 'sidebar-link-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .sidebar-link:not(.disabled):hover {
        background: rgba(255, 255, 255, 0.03);
        color: var(--text-primary) !important;
      }
      .sidebar-link:not(.disabled):hover .chevron-icon {
        opacity: 0.7 !important;
      }
      .sidebar-link.active {
        background: var(--primary-glow) !important;
        color: var(--primary-light) !important;
        border: 1px solid rgba(76, 175, 80, 0.15);
      }
      .sidebar-link.active .chevron-icon {
        opacity: 1 !important;
        color: var(--primary-light);
      }
      @media (max-width: 992px) {
        .sidebar-container {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

export default Sidebar;
